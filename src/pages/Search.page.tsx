import { useState } from "react";
import { toast } from "react-toastify";
import CustomInput from "../components/primitives/inputs/Custom.input";
import { httpClient } from "../http-client";
import { CharacterInterface, CharecterResponseInterface } from "../models";

function SearchPage() {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAllCharacters(query: string) {
    try {
      setLoading(true);
      const response: CharecterResponseInterface = await httpClient.request({
        requestType: 0,
        endpoint: `character/?name=${query}`,
        requiresToken: false,
      });
      response.results.forEach((result) => {
        result.episodeNumber = result.episode.length;
      });
      setCharacters(response.results);
      setLoading(false);
    } catch (error) {
      setCharacters([]);
      toast.error(`${error as string}`);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col justify-center py-6 sm:py-12">
      <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <CustomInput
        query={(q: string) => (q && q.length > 0 ? getAllCharacters(q) : setCharacters([]))}
        characterList={characters}
        loading={loading}
      />
    </div>
  );
}

export default SearchPage;
