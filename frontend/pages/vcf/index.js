import Link from "next/link";
//The Home page for VCF data
const VCF_Home = ({ data }) => {
  return (
    <div>
      <h1>VCF Home</h1>

      {Object.keys(data).length ? (
        <>
          <table id="myTable">
            <thead>
              <tr>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((vcf) => (
                <tr key={vcf.id}>
                  <td>
                    <Link href={`/vcf/${vcf.id}`}>
                      <a>
                        {vcf.id}
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <pre>{JSON.stringify(data)}</pre> */}
        </>
      ) : (
        <>
          <h1>No data found</h1>
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const vcf_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/vcfs`
  );
  const data = await parseJSONSafely(vcf_res);

  return {
    props: {
      data
    },
  };
};

export default VCF_Home;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
