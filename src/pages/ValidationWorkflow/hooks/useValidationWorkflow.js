import { useState } from "react";

const DEFAULT_PHASE_TWO = [
  "Reservation Assignment",
  "Education Validation",
  "Experience Validation",
  "Inclusion Assignment",
];

const useValidationWorkflow = () => {
  const [phaseTwo, setPhaseTwo] = useState(DEFAULT_PHASE_TWO);

  const [originalPhaseTwo, setOriginalPhaseTwo] = useState(DEFAULT_PHASE_TWO);

  const [version, setVersion] = useState(1);

  const [isPublished, setIsPublished] = useState(true);

  const [isDirty, setIsDirty] = useState(false);

  const [previewData, setPreviewData] = useState({
    age: 28,

    category: "General",

    education: "Graduate",

    experience: 2,

    exclusion: "None",
  });

  const [previewResult, setPreviewResult] = useState(null);

  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...phaseTwo];

    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];

    setPhaseTwo(updated);

    setIsDirty(true);
  };

  const moveDown = (index) => {
    if (index === phaseTwo.length - 1) return;

    const updated = [...phaseTwo];

    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    setPhaseTwo(updated);

    setIsDirty(true);
  };
  const handlePreviewChange = (field, value) => {
    setPreviewData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const runPreview = () => {
    /* -------------------------
           Phase 1 : Exclusion
        ------------------------- */

    if (previewData.exclusion !== "None") {
      setPreviewResult({
        phase: "Phase 1",

        status: "Rejected",

        reason: `Matched exclusion "${previewData.exclusion}".`,
      });

      return;
    }

    /* -------------------------
           Phase 1 : Age
        ------------------------- */

    if (previewData.age < 21 || previewData.age > 35) {
      setPreviewResult({
        phase: "Phase 1",

        status: "Rejected",

        reason: "Age Boundary Validation Failed.",
      });

      return;
    }

    /* -------------------------
           Phase 2 : Education
        ------------------------- */

    if (previewData.education.trim() === "") {
      setPreviewResult({
        phase: "Phase 2",

        status: "Rejected",

        reason: "Education Validation Failed.",
      });

      return;
    }

    /* -------------------------
           Phase 2 : Experience
        ------------------------- */

    if (Number(previewData.experience) < 2) {
      setPreviewResult({
        phase: "Phase 2",

        status: "Rejected",

        reason: "Experience Validation Failed.",
      });

      return;
    }

    /* -------------------------
           Final Decision
        ------------------------- */

    setPreviewResult({
      phase: "Eligibility Decision",

      status: "Eligible",

      reason: "Candidate passed all configured workflow validations.",
    });
  };

  const saveWorkflow = () => {
    setOriginalPhaseTwo([...phaseTwo]);

    setIsDirty(false);

    console.log("Workflow Saved");
  };

  const createNewVersion = () => {
    setIsPublished(false);

    console.log("Draft Version Created");
  };

  const publishWorkflow = () => {
    setOriginalPhaseTwo([...phaseTwo]);

    setVersion((prev) => prev + 1);

    setIsPublished(true);

    setIsDirty(false);

    console.log("Workflow Published");
  };

  const discardChanges = () => {
    setPhaseTwo([...originalPhaseTwo]);

    setPreviewResult(null);

    setIsDirty(false);

    console.log("Changes Discarded");
  };

  const resetWorkflow = () => {
    setPhaseTwo([...DEFAULT_PHASE_TWO]);

    setPreviewResult(null);

    setIsDirty(true);

    console.log("Workflow Reset");
  };
  return {
    /* -----------------------------
           Workflow Order
        ----------------------------- */

    phaseTwo,

    moveUp,

    moveDown,

    /* -----------------------------
           Version Management
        ----------------------------- */

    version,

    isPublished,

    isDirty,

    saveWorkflow,

    createNewVersion,

    publishWorkflow,

    discardChanges,

    resetWorkflow,

    /* -----------------------------
           Preview
        ----------------------------- */

    previewData,

    previewResult,

    handlePreviewChange,

    runPreview,
  };
};

export default useValidationWorkflow;
