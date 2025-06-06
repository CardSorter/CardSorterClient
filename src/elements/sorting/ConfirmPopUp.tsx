import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendSort, closeConfirmPopUp, CategoryRequest} from 'actions/sorting/uiAction';
import StateSchema from "reducers/StateSchema";
import {useTranslations} from "next-intl";

const ConfirmPopUp = () => {
  const t = useTranslations("SortingPage");

  // State
  const studyId = useSelector((state: StateSchema) => (state.sortingUi.studyID));
  const unsortedCards = useSelector((state: StateSchema) => (state.sortingBoard.unsortedCards));
  const categories = useSelector((state: StateSchema) => (state.sortingBoard.categories));
  const timeStarted = useSelector((state: StateSchema) => state.sortingUi.timeStarted);
  const comment = useSelector((state: StateSchema) => state.sortingUi.userComment);

  // Dispatch
  const dispatch = useDispatch<any>();

  const handleConfirmFinish = () => {
    const categoryRequest: Record<number, CategoryRequest> = {};
    for (const category of Object.values(categories)){
      categoryRequest[category.id] = {id: category.id, title: category.title || "", cards: category.cards.map((c) => c.id)};
    }
    

    dispatch(sendSort(
      studyId || "",
      unsortedCards.map((c) => (c.id)),
      categoryRequest,
      timeStarted || new Date(),
      new Date(),
      comment || "",
    ));
  };

  const onClose = () => dispatch(closeConfirmPopUp());

  return (
    <div className="popup-container finish-sorting-popup" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="content">
          {unsortedCards.length > 0 ?
            <p>{t("confirm finish unsorted")}</p>
            : <p>{t("confirm finish")}</p>}
        </div>
        <div className="button-container">
          <button className="btn--main finish" onClick={handleConfirmFinish}>
            <span>{t("finish sorting")}</span>
          </button>
          <button className="btn--secondary continue" onClick={onClose}>
            <span>{t("continue sorting")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;