import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { InformationCircleIcon } from "@heroicons/react/outline";

const ProcessComplaint = (props) => {
  const [listComplaints, setListComplaints] = useState(null);

  const CancelToken = axios.CancelToken;
  let cancel;

  const getList = () => {
    axios
      .get(
        "/api/officer/process_complaints",
        {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setListComplaints(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getList();

    return () => {
      cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        <p className="text-gray-400">Overview</p>
        <p className="text-2xl">Laporan di Proses</p>
      </div>
      <div>
        {listComplaints === null ? (
          <div>Loading...</div>
        ) : listComplaints.length === 0 ? (
          <div>Data Laporan Kosong</div>
        ) : (
          <Fragment>
            <table className="border border-gray-200 shadow-lg mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="text-sm uppercase py-3 px-1 text-center">No</th>
                  <th className="text-sm uppercase">Judul</th>
                  <th className="text-sm uppercase hidden md:table-cell">Isi</th>
                  <th className="text-sm uppercase">Status</th>
                  <th className="text-sm uppercase hidden md:table-cell">Tipe</th>
                  <th className="text-sm uppercase hidden md:table-cell">Tanggal Laporan</th>
                  <th className="text-sm uppercase text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {listComplaints.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center py-4">{index + 1}</td>
                    <td className="">
                      <div className="w-36 overflow-hidden overflow-ellipsis">{item.judul_laporan}</div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="w-64 overflow-hidden overflow-ellipsis">{item.isi_laporan}</div>
                    </td>
                    <td className="">
                      <span
                        className={`${
                          item.status === "0"
                            ? "text-white bg-dark"
                            : item.status === "proses"
                            ? "text-dark bg-yellow-300"
                            : item.status === "selesai"
                            ? "text-green-800 bg-green-300"
                            : item.status === "tolak"
                            ? "bg-primary text-white"
                            : ""
                        } text-sm px-2 py-1 rounded-full`}>
                        {item.status === "0" ? "Belum Diverifikasi" : item.status}
                      </span>
                    </td>
                    <td
                      className={`${
                        item.tipe === "pengaduan"
                          ? "text-primary"
                          : item.tipe === "kritik_saran"
                          ? "text-dark"
                          : item.tipe === "pertanyaan"
                          ? "text-green-800"
                          : ""
                      } hidden md:table-cell`}>
                      {item.tipe === "pengaduan"
                        ? "PENGADUAN"
                        : item.tipe === "kritik_saran"
                        ? "KRITIK & SARAN"
                        : item.tipe === "pertanyaan"
                        ? "PERTANYAAN"
                        : ""}
                    </td>
                    <td className="hidden md:table-cell">{item.tanggal_laporan}</td>
                    <td className="space-x-3">
                      <button
                        className="text-purple-800 hover:underline"
                        onClick={() => props.history.push(`/dashboard/admin/complaint/${item.id_pengaduan}`)}>
                        <InformationCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProcessComplaint;
