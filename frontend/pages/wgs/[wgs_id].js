import { useRouter } from "next/router";

const WGS = ({ data }) => {
  const router = useRouter();
  const { wgs_id } = router.query;
// This file takes the study_accessions, study_accessions, experiment_accessions, fastq files and all the information that belongs to the wgs data from strapi and shows it on the wgs frontend page.
  return (
    <>
      <p>ID: {wgs_id}</p>

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
                <td>{data.sample_accession.sample_accession}</td>
                <td>
                  <a href={`/experiment_accession/${data.experiment_accession.id}`}>
                    {data.experiment_accession.experiment_accession}
                  </a>
                </td>
                <td>
                  {data.fastq.map((file) => {
                    return (
                      <li key={file.id}>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}${file.url}`} >
                          {file.name}
                        </a>
                      </li>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <pre>{JSON.stringify(data)}</pre> */}
        </>
      ) : (
        <>
          <h1>No data found</h1>
        </>
      )}
    </>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const { wgs_id } = query;

  const wgs_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wgs/${wgs_id}`
  );
  const data = await parseJSONSafely(wgs_res);

  return {
    props: {
      data
    },
  };
};
export default WGS;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
