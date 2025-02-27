import { useRouter } from "next/router";
import { useState } from "react";

import {
  errorHandler,
  recordsHandler,
  successHandler,
} from "@grouparoo/ui-components/eventHandlers";
import RecordsPage from "@grouparoo/ui-components/pages/model/[modelId]/records";
import { Actions, Models } from "@grouparoo/ui-components/utils/apiData";
import { UseApi } from "@grouparoo/ui-components/hooks/useApi";
import LoadingButton from "@grouparoo/ui-components/components/LoadingButton";
import AddSampleRecordModal from "@grouparoo/ui-components/components/record/AddSampleRecordModal";

export default function Page(props) {
  const {
    modelId,
    properties,
  }: {
    modelId: string;
    properties: Models.PropertyType[];
  } = props;
  const router = useRouter();
  const { execApi } = UseApi(props, errorHandler);

  const [loading, setLoading] = useState(false);
  const [addingRecord, setAddingRecord] = useState(false);

  async function importAllRecords() {
    setLoading(true);
    successHandler.set({ message: "enqueued for import..." });
    const response: Actions.RecordsImport = await execApi(
      "post",
      `/records/${modelId}/import`
    );
    if (response) {
      recordsHandler.publish(
        response.responses.map((r) => {
          return { id: r.recordId };
        })
      );
      successHandler.set({ message: "Import Complete!" });
    }
    setLoading(false);
  }

  return (
    <>
      <RecordsPage {...props} />
      <LoadingButton
        disabled={addingRecord || loading}
        variant="primary"
        onClick={() => setAddingRecord(true)}
      >
        Add Sample Record
      </LoadingButton>
      &nbsp;
      <LoadingButton
        variant="primary"
        onClick={() => importAllRecords()}
        disabled={loading}
      >
        Import All Records
      </LoadingButton>
      <AddSampleRecordModal
        modelId={modelId}
        properties={properties}
        execApi={execApi}
        show={addingRecord}
        onRecordCreated={() => {
          router.reload();
        }}
        onHide={() => {
          setAddingRecord(false);
        }}
      />
    </>
  );
}

Page.getInitialProps = async (ctx) => {
  return RecordsPage.getInitialProps(ctx);
};
