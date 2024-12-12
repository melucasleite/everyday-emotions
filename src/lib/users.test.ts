import fetchMock from "jest-fetch-mock";
import { currentUser } from "@clerk/nextjs/server";
import { getOrCreateCurrentUser } from "./users";
import prisma from "./prisma";

jest.mock("@clerk/nextjs/server");
jest.mock("./prisma", () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
}));

describe("getOrCreateCurrentUser", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.resetAllMocks();
  });

  const mockUser = {
    id: "123",
    firstName: "John",
    lastName: "Doe",
    emailAddresses: [{ emailAddress: "john.doe@example.com" }],
  };

  const mockUserData = {
    ssoId: "123",
    name: "John Doe",
    email: "john.doe@example.com",
  };

  test("should throw an error if user is not signed in", async () => {
    (currentUser as jest.Mock).mockResolvedValue(null);

    await expect(getOrCreateCurrentUser()).rejects.toThrow(
      "User is not signed in."
    );
  });

  test("should return existing user if found and also update user data with latest clerk data", async () => {
    (currentUser as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserData);
    (prisma.user.update as jest.Mock).mockResolvedValue(mockUserData);

    const user = await getOrCreateCurrentUser();

    expect(user).toEqual(mockUserData);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { ssoId: mockUser.id },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { ssoId: mockUser.id },
      data: mockUserData,
    });
  });

  test("should create a new user if not found", async () => {
    (currentUser as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUserData);

    const user = await getOrCreateCurrentUser();

    expect(user).toEqual(mockUserData);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { ssoId: mockUser.id },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({ data: mockUserData });
  });

  test("should throw an error if prisma throws an unknown error", async () => {
    (currentUser as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("Unknown error")
    );

    await expect(getOrCreateCurrentUser()).rejects.toThrow("Unknown error");
  });
});
