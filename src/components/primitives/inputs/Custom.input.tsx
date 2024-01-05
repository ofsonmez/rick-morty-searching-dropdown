import { useState } from "react";
import { CharacterInterface } from "../../../models";
import Loader from "../../shared/Loader.component";

interface Props {
  query: (q: string) => void;
  characterList: CharacterInterface[];
  loading: boolean;
}

export default function CustomInput({ query, characterList, loading }: Readonly<Props>) {
  const [search, setSearch] = useState("");
  const [selectedChars, setSelectedChars] = useState<string[]>([]);

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
      <div className="w-full px-4">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-1 flex border border-[#97a2b6] bg-white rounded-xl">
              <div className="flex flex-auto flex-wrap">
                {selectedChars.map((x, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center m-1 font-medium py-2 px-2 bg-[#e3e7ef] rounded-xl text-[#354153]"
                  >
                    <div className="text-md font-semibold leading-none max-w-full flex-initial">{x}</div>
                    <button
                      className="ml-2 flex p-1 justify-center items-center bg-[#97a2b6] rounded-md"
                      onClick={() => {
                        const index = selectedChars.indexOf(x);
                        let newChars: string[] = [];
                        newChars = newChars.concat(selectedChars);
                        newChars.splice(index, 1);
                        setSelectedChars(newChars);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x cursor-pointer text-white rounded-full w-4 h-4"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}

                <div className="flex-1">
                  <input
                    placeholder="Please enter the wanted character name"
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-xl font-semibold text-gray-700"
                    onChange={(e) => {
                      query(e.target.value);
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center border-gray-200">
                <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="feather feather-chevron w-4 h-4"
                  >
                    <path
                      fill="#6a6b6a"
                      d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {!loading ? (
            characterList &&
            characterList.length > 0 && (
              <div className="shadow bg-white z-40 border-[#97a2b6] border w-full lef-0 rounded-xl overflow-y-auto custom-h-1">
                <div className="flex flex-col w-full border-[#97a2b6]">
                  {characterList.map((character: CharacterInterface) => (
                    <div key={character.id} className="w-full border-[#97a2b6] rounded-t border-b bg-[#f8fafc]">
                      <div className="flex w-full items-center p-3 pl-2 border-transparent border-l-2 relative">
                        <div className="w-full items-center flex">
                          <input
                            id={"default-checkbox" + character.id}
                            type="checkbox"
                            checked={selectedChars.includes(character.name)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              let chars: string[] = [];
                              chars = chars.concat(selectedChars);
                              if (e.target.checked) {
                                chars.push(character.name);
                                setSelectedChars(chars);
                              } else {
                                const index = selectedChars.indexOf(character.name);
                                chars.splice(index, 1);
                                setSelectedChars(chars);
                              }
                            }}
                          />
                          <label htmlFor={"default-checkbox" + character.id}>
                            <div className="flex justify-center ml-2 cursor-pointer">
                              <img
                                src={character.image}
                                alt={character.name}
                                className="rounded-lg object-cover object-top"
                                width={45}
                                height={45}
                              />
                              <div>
                                <div
                                  className="mx-2 leading-6 text-[#4a5567]"
                                  dangerouslySetInnerHTML={{
                                    __html: character.name.replace(
                                      new RegExp(search, "i"),
                                      (match) => `<strong>${match}</strong>`
                                    ),
                                  }}
                                ></div>
                                <div className="mx-2 leading-6 text-[#677389]">{character.episodeNumber} Episodes</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
