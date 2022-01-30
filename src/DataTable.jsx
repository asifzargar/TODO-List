import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import { TableBody } from "@mui/material";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  const getData = (page) => {
    const url = `https://api.github.com/repos/neovim/neovim/pulls?state=all&per_page=15&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (page > 1) {
          let result = [...data, ...res];
          setTimeout(() => {
            setData(result);
            setLoader(false);
          }, 1000);
        } else {
          setData(res);
        }
      });
  };
  useEffect(() => {
    getData(page);
  }, []);

  const handleScroll = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 50;
    if (bottom) {
      let pages = page + 1;
      if (pages == 5) {
        return;
      }
      setLoader(true);
      setTimeout(() => {
        getData(pages);
        setPage(pages);
      }, 1000);
    }
  };

  return (
    <>
      <div
        onScroll={handleScroll}
        style={{ overflowY: "auto", height: "500px", marginTop: "100px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Base Branch</TableCell>
              <TableCell>Author Branch</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created_at</TableCell>
              <TableCell>Reviewers</TableCell>
              <TableCell>Labels</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((detail, i) => {
              return (
                <>
                  <TableRow>
                    <TableCell rowSpan={detail.labels.length + 1}>
                      {detail.title}
                    </TableCell>
                    <TableCell rowSpan={detail.labels.length + 1}>
                      {detail.base.ref}
                    </TableCell>
                    <TableCell rowSpan={detail.labels.length + 1}>
                      {detail.head.repo.default_branch}
                    </TableCell>
                    <TableCell rowSpan={detail.labels.length + 1}>
                      {detail.head.repo.owner.login}
                    </TableCell>
                    <TableCell rowSpan={detail.labels.length + 1}>
                      {detail.created_at}
                    </TableCell>
                    <TableCell rowSpan={detail.labels.length + 1}>
                      {detail.requested_reviewers.map((details) => {
                        return <>{details.login}</>;
                      })}
                    </TableCell>
                  </TableRow>
                  {detail.labels.map((n) => (
                    <TableRow>
                      <TableCell>{n.name}</TableCell>
                    </TableRow>
                  ))}
                </>
              );
            })}
          </TableBody>
          {loader === true && (
            <div style={{ paddingLeft: "750px" }}>
              <CircularProgress />
            </div>
          )}
        </Table>
      </div>
    </>
  );
};
export default DataTable;
