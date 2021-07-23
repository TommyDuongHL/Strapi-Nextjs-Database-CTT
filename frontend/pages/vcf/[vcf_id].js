import { useRouter } from "next/router";

const VCF = ({ data, sample_acc }) => {
  const router = useRouter();
  const { vcf_id } = router.query;
  //This file takes the study_accesion, sample_accesion, analysis_accession, VCF file, VEP file and all the other corresponding information from Strapi and shows it on the VCF frontend page.

  return (
    <>
      <h1>Project: {data.vcf_id}</h1>
      <p style={{overflowY: "scroll", maxWidth: "180ch", maxHeight: "12rem", whiteSpace: "pre-wrap" }}>{data.description ?? "No description given"}</p>
      <div style={{display: "flex", gap: "2rem"}}>
        <div id="keys" style={{display: "flex", flexDirection: "column"}}>
          <b>Study Title:</b>
          <b>Center Name:</b>
        </div>

        <div id="values" style={{display: "flex", flexDirection: "column"}}>
          <span>{data.organism}</span>
          <span>{data.center_name}</span>
        </div>
      </div>      
      
      <p>ID: {vcf_id}</p>

      {Object.keys(data).length ? (
        <>
          <table id="myTable">
            <thead>
              <tr>
                <th>Study Accession</th>
                <th>Sample Accession</th>
                <th>Analysis Accession</th>
                <th>VCF</th>
                <th>VEP</th>
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
                  <a href={`/sample_accession/${data.analysis_accession.sample_accession}`}>
                    {sample_acc?.sample_accession}
                  </a>
                </td>
                <td>{data.analysis_accession.analysis_accession}</td>
                <td>
                  {data.VCF.map((file) => {
                    return (
                      <li key={file.id}>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}${file.url}`} >
                          {file.name}
                        </a>
                      </li>
                    );
                  })}
                </td>
                <td>
                  {data.VEP.map((file) => {
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
  const { vcf_id } = query;

  const vcf_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vcfs/${vcf_id}`
  );
  const data = await parseJSONSafely(vcf_res);
  
  let sample_acc = {};
  // Check if API data is empty
  if (Object.keys(data).length) {
    if (data.analysis_accession?.sample_accession) {
      const sample_res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sample-accessions/${data.analysis_accession.sample_accession}`
      );
      sample_acc = await sample_res.json();
    }
  }

  return {
    props: {
      data,
      sample_acc
    },
  };
};
export default VCF;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
