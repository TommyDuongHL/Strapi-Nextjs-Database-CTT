import { useRouter } from "next/router";

const Experiment = ({ data }) => {
  const router = useRouter();
  const { experiment_accession } = router.query;
//The experiment_accession and the corresponding sample_accesion, study_accession, fastq files and all the other corresponding information are taken from strapi and shown in the experiment accession frontend page.
  return (
    <>
      <h1>Project: {data.vcf_id}</h1>
      <p
        style={{
          overflowY: "scroll",
          maxWidth: "180ch",
          maxHeight: "12rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {data.description ?? "No description given"}
      </p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div id="keys" style={{ display: "flex", flexDirection: "column" }}>
          <b>Instrument Platform:</b>
          <b>Instrument Model:</b>
        </div>

        <div id="values" style={{ display: "flex", flexDirection: "column" }}>
          <span>{data.Instrument_Platform}</span>
          <span>{data.Instrument_Model}</span>
        </div>
      </div>
      <p>ID: {experiment_accession}</p>

      {Object.keys(data).length ? (
        <>
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
              <tr>
                <td>
                  <a href={`/study_accession/${data.study_accession.id}`}>
                    {data.study_accession.study_accession}
                  </a>
                </td>
                <td>
                  <a href={`/sample_accession/${data.sample_accession.id}`}>
                    {data.sample_accession.sample_accession}
                  </a>
                </td>
                <td>{data.experiment_accession}</td>
                {data.wg.fastq.map((file) => {
                  return (
                    <li key={file.id}>
                      <a href={`${process.env.NEXT_PUBLIC_API_URL}${file.url}`} >
                        {file.name}
                      </a>
                    </li>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h1>No data found</h1>
        </>
      )}
    </>
  );
};
// get experiment_accession from query
export const getServerSideProps = async ({ req, query }) => {
  const { experiment_accession } = query;

  const wgs_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/experiment-accessions/${experiment_accession}`
  );
  const data = await parseJSONSafely(wgs_res);

  return {
    props: {
      data
    },
  };
};
export default Experiment;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
