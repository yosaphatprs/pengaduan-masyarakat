import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../public/Footer";
import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon, CheckIcon, CalendarIcon } from "@heroicons/react/outline";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

const logout = (props) => {
  const appState = {
    isLoggedIn: false,
    user: {},
  };
  localStorage.setItem("appState", JSON.stringify(appState));
  props.history.push("/");
};

const DetailComplaintUser = (props) => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [dataTanggapan, setDataTanggapan] = useState(null);
  const CancelToken = axios.CancelToken;
  let cancel;

  const getList = () => {
    axios
      .get(
        `/api/people/complaint/${id}`,
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
        setData(res.data.data_pengaduan[0]);
        setDataTanggapan(res.data.data_tanggapan);
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
      <div className="flex shadow-sm border-b items-center border-gray-100  py-4 px-8 bg-white">
        <h5 className="text-sm flex flex-1 text-primary cursor-pointer" onClick={() => props.history.push("/")}>
          LAPORAN PENGADUAN MASYARAKAT
        </h5>
        <div className="flex flex-1 justify-end ">
          <Menu as="div">
            {({ open }) => (
              <>
                <Menu.Button className="outline-none focus:outline-none bg-primary h-8 w-8 rounded-full p-4"></Menu.Button>
                <Transition
                  show={open}
                  enter="transition duration-200 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="opacity-200"
                  leaveTo="opacity-0">
                  <Menu.Items
                    static
                    as="ul"
                    className="absolute right-8 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                    <div className="px-1 py-2 space-y-2">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => logout(props)}
                            className={`${
                              active ? "bg-violet-500 text-primary" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                            <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
      {data !== null ? (
        <div className="flex flex-col w-full p-12 items-center bg-gray-50">
          <div className="flex flex-col mt-4 space-y-5 border border-gray-100 p-12 bg-white w-8/12 shadow-sm">
            <div>
              <div className="w-full text-center text-lg mb-2">Jenis Laporan</div>
              <div className="flex flex-col md:flex-row md:space-x-2 justify-center md:space-y-0 space-y-2">
                <div className="w-full space-x-2 flex">
                  <div
                    className={`bg-white ${
                      data.tipe === "pengaduan" ? "bg-primary text-white" : ""
                    } transition-all rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p as="p" className={`font-medium `}>
                            PENGADUAN
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0  p-1 rounded-full text-white`}>
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`bg-white ${
                      data.tipe === "kritik_saran" ? "bg-primary text-white" : ""
                    } transition-all rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p as="p" className={`font-medium `}>
                            KRITIK & SARAN
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0  p-1 rounded-full text-white`}>
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`bg-white ${
                      data.tipe === "pertanyaan" ? "bg-primary text-white" : ""
                    } transition-all rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p as="p" className={`font-medium `}>
                            PERTANYAAN
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0  p-1 rounded-full text-white`}>
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-field ">
              <label className="font-medium">
                Judul{" "}
                {data.tipe === "pengaduan" ? (
                  "Laporan"
                ) : data.tipe === "kritik_saran" ? (
                  <>Kritik / Saran</>
                ) : (
                  <>Pertanyaan</>
                )}
              </label>
              <input name="judul" value={data.judul_laporan} className="text-field-input" type="text" readOnly />
            </div>
            <div className="text-field">
              <label className="font-medium">
                Isi{" "}
                {data.tipe === "pengaduan" ? (
                  <>Laporan</>
                ) : data.tipe === "kritik_saran" ? (
                  <>Kritik / Saran</>
                ) : (
                  <>Pertanyaan</>
                )}
              </label>
              <TextareaAutosize
                name="isi_laporan"
                value={data.isi_laporan}
                className="text-area-input"
                minRows={6}
                readOnly
              />
            </div>
            <div className="text-field relative">
              <label className="font-medium">Tanggal Kejadian</label>
              <div className="flex">
                <input
                  readOnly
                  className="flex flex-1 text-field-input"
                  type="text"
                  value={data.tanggal_kejadian === null ? "" : data.tanggal_kejadian}
                  placeholder="Pilih tanggal kejadian"
                />
                <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="text-field relative">
              <label className="font-medium">Tanggal Laporan</label>
              <div className="flex">
                <input
                  readOnly
                  className="flex flex-1 text-field-input"
                  type="text"
                  value={data.tanggal_laporan}
                  placeholder="Pilih tanggal kejadian"
                />
                <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="text-field ">
              <label className="font-medium">Provinsi {data.tipe === "pengaduan" ? <>Kejadian</> : <>Tujuan</>}</label>
              <input className="text-sm text-field-input" value={data.provinsi_kejadian} readOnly />
            </div>
            <div className="text-field">
              <label className="font-medium">
                Kota/Kabupaten {data.tipe === "pengaduan" ? <>Kejadian</> : <>Tujuan</>}
              </label>
              <input className="text-sm text-field-input" value={data.kota_kejadian} readOnly />
            </div>
            <div className="text-field">
              <label className="font-medium">Kecamatan {data.tipe === "pengaduan" ? <>Kejadian</> : <>Tujuan</>}</label>
              <input className="text-sm text-field-input" value={data.kecamatan_kejadian} readOnly />
            </div>
            <div className="text-field ">
              <label className="font-medium">Lampiran Foto</label>
              {data.foto !== null ? (
                <img className="w-24 h-24" src={`/storage/foto/${data.foto}`} alt="lampiran" />
              ) : (
                <p className="italic text-gray-600">Tidak ada Lampiran</p>
              )}
            </div>
          </div>
          {dataTanggapan !== null
            ? dataTanggapan.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col mt-4 space-y-5 border border-gray-100 p-8 bg-white w-8/12 shadow-sm">
                  <div>{item.tanggapan}</div>
                  <div className="text-sm text-gray-400">Dibalas Oleh: {item.nama_petugas}</div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <div>Loading</div>
      )}

      <Footer />
    </div>
  );
};

export default DetailComplaintUser;
