import Link from "next/link";

const WGS_Home = ({ data }) => {
  return (
    <div>
      <h1>WGS Home</h1>

      {Object.keys(data).length ? (
        <>
          <table id="myTable">
            <thead>
              <tr>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((wgs) => (
                <tr key={wgs.id}>
                  <td>
                    <Link href={`/wgs/${wgs.id}`}>
                      <a>
                        {wgs.id}
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
  const wgs_res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wgs`
  );
  const data = await parseJSONSafely(wgs_res);

  return {
    props: {
      data
    },
  };
};

export default WGS_Home;

async function parseJSONSafely(obj) {
  try {
    return await obj.json();
  } catch (e) {
    console.error(e);
    return {};
  }
}
