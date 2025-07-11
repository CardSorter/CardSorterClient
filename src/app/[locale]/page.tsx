/*
--------------------
Template DO NOT EDIT
--------------------
*/

'use client';

import React, {useEffect} from 'react';
import { useRouter } from 'i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, []);

  return (<></>);
}
