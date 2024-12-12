export const Options = ({
  questionId,
  options,
  type,
}: {
  questionId: number;
  options: { id: number; text: string }[];
  type: "radio" | "checkbox";
}) => {
  return (
    <>
      {options.map((option) => (
        <div key={option.id}>
          <input
            type={type}
            id={`question-${questionId}-option-${option.id}`}
            name={`question-${questionId}${
              type === "checkbox" ? `-option-${option.id}` : ""
            }`}
            value={option.text}
          />
          <label htmlFor={`question-${questionId}-option-${option.id}`}>
            {option.text}
          </label>
        </div>
      ))}
    </>
  );
};
