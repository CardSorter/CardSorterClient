"use client"

import React, {useEffect, useState} from 'react';
import { useSearchParams  } from 'next/navigation'
import Link from "next/link";
import L from 'localization/LocalizedText';

interface FiltersProps {
  ongoing: boolean,
  completed: boolean,
}

// TODO: Needs to be refactored to use the global redux state
export default function Filters({ ongoing: ongoingAttr, completed: completedAttr }: FiltersProps){
  const [ongoingRef, setOngoingRef] = useState('all');
  const [completedRef, setCompletedRef] = useState('all');

  const [ongoingStyle, setOngoingStyle] = useState('');
  const [completedStyle, setCompletedStyle] = useState('');
  const [allStyle, setAllStyle] = useState('');
  const searchParams = useSearchParams()

  useEffect(() => {
    if (ongoingAttr) {
      setOngoingRef('ongoing');
    }
    if (completedAttr) {
      setCompletedRef('completed');
    }

    // Change the style of the active item
    setOngoingStyle('');
    setCompletedStyle('');
    setAllStyle('');
    if (searchParams.get("filter") === 'ongoing') {
      setOngoingStyle('active');
    } else if (searchParams.get("filter") === 'completed') {
      setCompletedStyle('active');
    } else {
      setAllStyle('active');
    }
  }, [searchParams]);

  return (
    <div className="filter-container">
      <Link href="/" className={allStyle}> {L?.text?.all}</Link>
      <Link href={{query: {filter: ongoingRef}}} className={ongoingStyle}>{L?.text?.ongoing}</Link>
      <Link href={{query: {filter: completedRef}}} className={completedStyle}>{L?.text?.completed}</Link>
    </div>
  );
};