import { useRouter } from "next/router";

const Study = ({ data }) => {
  const router = useRouter();
  const { study_accession } = router.query;
// Here all the study_accessions with the corresponding sample_accesion, experiment_accession, fastq file and all the other corresponding information are taken from strapi and shown in the study accession frontend page.
  return (
    <>
      <h1>Project: {data.study_accession}</h1>
      <p style={{overflowY: "scroll", maxWidth: "180ch", maxHeight: "12rem", whiteSpace: "pre-wrap" }}>{data.description ?? "No description given"}</p>
      <div style={{display: "flex", gap: "2rem"}}>
        <div id="keys" style={{display: "flex", flexDirection: "column"}}>
          <b>Study Title:</b>
          <b>Center Name:</b>
          <b>Study Name:</b>
        </div>

        <div id="values" style={{display: "flex", flexDirection: "column"}}>
          <span>{data.study_title}</span>
          <span>{data.center_name}</span>
          <span>{data.study_name}</span>
        </div>
      </div>
      
      <br />
      
      {/* <p>ID: {study_accession}</p>
      <p>{isOwner ? "ja" : "nee"}</p> */}
      <table id="myTable">
        <thead>
          <tr>
            <th>Study Accession</th>
            <th>Sample Accession</th>
            <th>Experiment Accession</th>
            <th>Fastq</th>
          </tr>
        </thead>
        <tbody>
          {data.experiment_accessions.map((experiments) => {
            return (
              <tr key={experiments.id}>
                <td>{data.study_accession}</td>
                <td>
                  <a href={`/sample_accession/${experiments.sample_accession}`}>
                    {
                      data.sample_accessions.find(
                        ({ id }) => id === experiments.sample_accession
                      ).sample_accession
                    }
                  </a>
                </td>
                <td>
                  <a href={`/experiment_accession/${experiments.id}`}>
                    {experiments.experiment_accession}
                  </a>
                </td>
                <td>
                  {data.wgs
                    .filter((wg) => wg.id === experiments.sample_accession)
                    .map((wg) => {
                      return wg.fastq.map((file) => (
                        <li key={file.id}>
                          <a href={`${process.env.NEXT_PUBLIC_API_URL}${file.url}`} >
                            {file.name}
                          </a>
                        </li>
                      ));
                    })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  // Get study_accession from URL
  // const study_accession = query.study_accession
  const { study_accession } = query;

  // Ask strapi for study accession data of ID
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/study-accessions/${study_accession}`
  );
  // Convert JSON text to object
  const data = await parseJSONSafely(res);

  return {
    props: {
      data
    },
  };
};
export default Study;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
