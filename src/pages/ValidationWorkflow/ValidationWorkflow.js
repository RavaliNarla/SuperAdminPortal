import React from "react";
import "../ValidationWorkflow/ValidationWorkflow.css";

import useValidationWorkflow from "../ValidationWorkflow/hooks/useValidationWorkflow";

import PhaseOne from "../ValidationWorkflow/components/PhaseOne";
import PhaseTwo from "../ValidationWorkflow/components/PhaseTwo";
import DecisionCard from "../ValidationWorkflow/components/DecisionCard";
import PreviewCandidate from "../ValidationWorkflow/components/PreviewCandidate";

const ValidationWorkflow = () => {
  const {
    phaseTwo,

    moveUp,

    moveDown,

    saveWorkflow,

    createNewVersion,

    publishWorkflow,

    discardChanges,

    resetWorkflow,

    version,

    isPublished,

    isDirty,

    previewData,

    previewResult,

    handlePreviewChange,

    runPreview,
  } = useValidationWorkflow();

  return (
    <div className="validation-page">
      {/* Header */}

      <div className="validation-header">
        <div>
          <h3 className="page-title">Validation Workflow</h3>

          <p className="page-subtitle">
            Configure execution order for candidate validation. Disqualifiers
            always execute first. Qualification validations can be reordered.
          </p>
        </div>
      </div>

      {/* Information */}

      <div className="info-card mb-4">
        <i className="bi bi-info-circle-fill"></i>

        <span>
          Workflow execution is version controlled. Published workflows become
          read-only. Create a new version whenever changes are required.
        </span>
      </div>

      {/* Phase 1 */}

      <PhaseOne isPublished={isPublished} />

      {/* Arrow */}

      <div className="workflow-arrow">
        <i className="bi bi-arrow-down"></i>
      </div>

      {/* Phase 2 */}

      <PhaseTwo
        phaseTwo={phaseTwo}
        moveUp={moveUp}
        moveDown={moveDown}
        isPublished={isPublished}
      />

      {/* Arrow */}

      <div className="workflow-arrow">
        <i className="bi bi-arrow-down"></i>
      </div>

      {/* Decision */}

      <DecisionCard
        version={version}
        isPublished={isPublished}
        isDirty={isDirty}
        saveWorkflow={saveWorkflow}
        createNewVersion={createNewVersion}
        publishWorkflow={publishWorkflow}
        discardChanges={discardChanges}
        resetWorkflow={resetWorkflow}
      />

      {/* Preview */}

      <PreviewCandidate
        previewData={previewData}
        previewResult={previewResult}
        handlePreviewChange={handlePreviewChange}
        runPreview={runPreview}
        isPublished={isPublished}
      />
    </div>
  );
};

export default ValidationWorkflow;
