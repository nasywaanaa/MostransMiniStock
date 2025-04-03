import { getToken } from "./helpers.ts";

let accessToken: string | null = null;
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initializeToken = async () => {
  try {
    accessToken = await getToken("john.doe@example.com", "pass123");
  } catch (error) {
    console.error("Error fetching token:", error);
    console.log("Failed to fetch access token.");
  }
};

// Helper function to check if token is initialized
const ensureTokenInitialized = async () => {
  if (!accessToken) {
    await initializeToken();
  }
};

export const handleSubmitTicket = async (
  title: string,
  description: string,
  note: string,
  dueDate: string,
  customerName: string,
  customerEmail: string,
  selectedFile: File[] | null,
  attachmentNote: string,
  onClose: () => void
) => {
  const url = backendURL + "/graphql";
  await ensureTokenInitialized(); // Ensure token is initialized before proceeding

  const query = `
      mutation InsertMasterTicket($input: TicketInput) {
        insertMasterTicket(input: $input) {
          status,
          id_affected,
          errMsg,
          return_id
        }
      }
    `;

  const variables = {
    input: {
      ticket_number: "TCKT - 043",
      title,
      description,
      customer_name: customerName,
      customer_email: customerEmail,
      status_id: "1",
      note_ticket: note,
      business_id: "1",
      category_id: "1",
      department_id: "1",
      due_date: dueDate,
      closed_by: null,
      closed_date: null,
      create_by: null,
      update_by: null,
      deleted_by: null,
      deleted_date: null,
    },
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        alert(`Error: ${data.errors[0].message}`);
      } else {
        await handleSubmitFile(
          data.data.insertMasterTicket.return_id,
          selectedFile,
          attachmentNote
        );
        onClose();
      }

      globalThis.location.reload();
    } else {
      alert("Failed to submit the ticket.");
    }
  } catch (error) {
    console.error("Error during submission:", error);
    alert("An error occurred during submission.");
  }
};

const handleSubmitFile = async (
  ticket_id: number,
  selectedFiles: File[] | null,
  attachmentNote: string
) => {
  await ensureTokenInitialized(); // Ensure token is initialized before proceeding

  if (!selectedFiles || selectedFiles.length === 0) {
    alert("Please select at least one file before submitting.");
    return;
  }

  const driveId =
    "b!GZq-AtWRIEGh_639YVCTsoHDteAt-hdKjk8YpjLYXDdhms40ICD5TYON0EHYSBhg";

  // Loop through all selected files
  for (const selectedFile of selectedFiles) {
    const url = `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${selectedFile.name}:/content`;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    headers.append("Content-Type", selectedFile.type);

    const requestOptions = {
      method: "PUT",
      headers,
      body: selectedFile,
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const data = await response.json();

        // Get the URL for the uploaded file
        const createLinkResponse = await fetch(
          `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${data.name}:/createLink`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "view",
              scope: "anonymous",
            }),
          }
        );

        const linkData = await createLinkResponse.json();
        const fileLink = linkData.link.webUrl;

        localStorage.setItem("fileLink", fileLink);
        globalThis.open(fileLink, "_blank");

        // GraphQL mutation to save attachment info
        const graphqlQuery = {
          query: `
            mutation InsertAttachment($input: AttachmentInput) {
              insertAttachmentTicket(input: $input) {
                status
                id_affected
                errMsg
              }
            }
          `,
          variables: {
            input: {
              ticket_id: ticket_id.toString(),
              url_attachment: fileLink,
              note_attachment: attachmentNote,
              name_attachment: data.name,
              deleted_date: null,
              deleted_by: null,
              create_by: null,
            },
          },
        };

        // Hit the GraphQL API with the mutation
        const graphqlResponse = await fetch(backendURL + "/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(graphqlQuery),
        });

        const graphqlResult = await graphqlResponse.json();

        if (!graphqlResponse.ok) {
          console.error("GraphQL mutation failed:", graphqlResult);
          alert(`Failed to submit ticket for file: ${selectedFile.name}`);
        }
      } else {
        console.error("File upload failed:", response.statusText);
        alert(`Failed to upload file: ${selectedFile.name}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert(`An error occurred while uploading file: ${selectedFile.name}`);
    }
  }
};
