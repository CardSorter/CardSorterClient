import React from 'react';
import {useRouter} from "next/navigation";
import plusSign from '../../icons/plus.svg';


// TODO: Convert to Link
export default function CreateStudyItem() {
    const router = useRouter();

    return (
        <button className="create-study-card" onClick={() => router.push("/create")}>
            <span className="material-symbols-outlined">add</span>
            <p>Create a study</p>
        </button>
    );
}