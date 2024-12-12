import Form from "@/components/Form";
import { surveys } from "@/lib/survey";
import { callback } from "./callback";

export default async function Page() {
  const survey = surveys[0];

  return (
    <>
      <Form survey={survey} callback={callback} />
    </>
  );
}
