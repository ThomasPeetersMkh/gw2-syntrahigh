import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const get = (endpoint) => {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios(baseUrl + endpoint);
          setLoading(false);
          setError(false);
          setData(data);
        } catch (error) {
          setLoading(false);
          setData([]);
          setError(error);
        }
      })();
    }, []);
    return {
      loading,
      error,
      data,
    };
  };
  const post = (endpoint, body) => {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios(baseUrl + endpoint, {
            method: "POST",
            data: JSON.stringify(body),
          });
          setLoading(false);
          setError(false);
          setData(data);
        } catch (error) {
          setLoading(false);
          setData([]);
          setError(error);
        }
      })();
    }, []);
    return {
      loading,
      error,
      data,
    };
  };

  const axiosDelete = (endpoint) => {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios(baseUrl + endpoint, {
            method: "DELETE",
          });
          setLoading(false);
          setError(false);
          setData(data);
        } catch (error) {
          setLoading(false);
          setData([]);
          setError(error);
        }
      })();
    }, []);
    return {
      loading,
      error,
      data,
    };
  };

  return { get, post, axiosDelete };
};

export default useAxios;
