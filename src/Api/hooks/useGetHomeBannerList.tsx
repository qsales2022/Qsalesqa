/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useGetHomeBannersFiles, useGetHomeSectionsFirst } from ".";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const useGetHomeBannerList = () => {
  const [bannerImagesEN, setBannerImagesEN] = useState([]);
  const [bannerImagesAR, setBannerImagesAR] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bannerFiles } = useGetHomeBannersFiles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleLoader(true));
    const getBannerImages = async () => {
      setBannerImagesEN(bannerFiles?.en);
      setBannerImagesAR(bannerFiles?.ar);
    };

    getBannerImages();
  }, [bannerFiles]);

  return { bannerImagesEN, bannerImagesAR, loading, error };
};

export default useGetHomeBannerList;
