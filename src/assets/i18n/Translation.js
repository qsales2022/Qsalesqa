import React from 'react';
import {useTranslation} from 'react-i18next';

const Translation = ({textKey}) => {
  const {t} = useTranslation();

  return <>{t(textKey)}</>;
};

export default Translation;
