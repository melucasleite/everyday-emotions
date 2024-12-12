import Form from "@/components/Form";
import { getFirstSurvey } from "@/lib/survey";
import { callback } from "@/lib/callback";

export default async function Page() {
  const survey = await getFirstSurvey();

  return (
    <>
      <Form survey={survey} callback={callback} />
    </>
  );
}
