import {useState, useEffect, useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {toggleLoader} from '../../redux/reducers/GlobalReducer';
import useGetHomeBannersFiles from './useGetHomeBannersFiles';

const useGetHomeBannerList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {bannerFiles} = useGetHomeBannersFiles();

  const dispatch = useDispatch();

  const getBannerImages = useCallback(() => {
    dispatch(toggleLoader(true));
    setLoading(true);

    try {
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getBannerImages();
  }, [getBannerImages]);

  const bannerImagesEN = useMemo(() => bannerFiles?.en || [], [bannerFiles]);
  const bannerImagesAR = useMemo(() => bannerFiles?.ar || [], [bannerFiles]);

  return {bannerImagesEN, bannerImagesAR, loading, error};
};

export default useGetHomeBannerList;
