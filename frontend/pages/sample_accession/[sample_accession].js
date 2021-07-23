import { useRouter } from "next/router";

const Sample = ({ data }) => {
  const router = useRouter();
  const { sample_accession } = router.query;
//The sample_accession with the corresponding study_accesions, experiment_accession, fastq files and all the other corresponding information are taken from strapi and shown in the study accession frontend page.
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
          <b>Organism:</b>
          <b>Taxon_id:</b>
        </div>

        <div id="values" style={{ display: "flex", flexDirection: "column" }}>
          <span>{data.organism}</span>
          <span>{data.taxon_id}</span>
        </div>
      </div>


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
              {data.experiment_accessions.map((experiment) => {
                return (
                  <tr key={experiment.id}>
                    <td>
                      <a href={`/study_accession/${data.study_accession.id}`}>
                        {data.study_accession.study_accession}
                      </a>
                    </td>
                    <td>{data.sample_accession}</td>
                    <td>
                      <a href={`/experiment_accession/${experiment.id}`}>
                        {experiment.experiment_accession}
                      </a>
                    </td>
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
                );
              })}
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
//get sample_accession from query
export const getServerSideProps = async ({ req, query }) => {
  const { sample_accession } = query;

  const wgs_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sample-accessions/${sample_accession}`
  );
  const data = await parseJSONSafely(wgs_res);

  return {
    props: {
      data
    },
  };
};

export default Sample;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
