import {
  FaqItem,
  FaqResponse,
  PKItem,
  PkResponse,
  TicketItem,
} from '../lib/interface.tsx';
import { Attachment } from '../pages/Customer/components/DetailTicketModal.tsx';
import { getToken } from './helpers.ts';

let accessToken: string | null = null;
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initializeToken = async () => {
  try {
    accessToken = await getToken('johndoe@example.com', 'password123');
  } catch (error) {
    console.error('Error fetching token:', error);
    console.log('Failed to fetch access token.');
  }
};

const ensureTokenInitialized = async () => {
  if (!accessToken) {
    await initializeToken();
  }
};

export const fetchFaqData = async (setFaqData: (data: FaqItem[]) => void) => {  
  await ensureTokenInitialized(); // Ensure token is initialized before making the request.

  const response = await fetch(
    'https://graph.microsoft.com/v1.0/sites/02be9a19-91d5-4120-a1ff-adfd615093b2/lists/ae6e0f7b-90f3-4c47-90b0-049dfd8b44fa/items?$expand=fields($select=*)',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly',
      },
    }
  );
  const data = await response.json();

  const faqData = data.value.map((item: FaqResponse) => {
    return {
      question: item.fields.Question,
      answer: item.fields.Answer,
    };
  });

  setFaqData(faqData);
};

// Fetch PK Data
export const fetchPkData = async (setPkData: (data: PKItem[]) => void) => {
  await ensureTokenInitialized(); // Ensure token is initialized before making the request.

  const response = await fetch(
    "https://graph.microsoft.com/v1.0/sites/02be9a19-91d5-4120-a1ff-adfd615093b2/lists/4a903f6d-461d-4239-8946-3b4c6b4ab456/items?$expand=fields($select=*)&filter=fields/ProductID eq 'MRKPLC'",
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly',
      },
    }
  );
  const data = await response.json();
  const pkData = data.value.map((item: PkResponse) => {
    return {
      title: item.fields.Title,
      description: item.fields.ProductDetail,
    };
  });

  setPkData(pkData);
};

export const fetchTickets = async (
  pageNumber: number,
  filter: string,
  search: string,
  setTicketData: (data: TicketItem[]) => void,
  setTotalPages: (total: number) => void,
  dateRange: { start: string; end: string }
) => {
  await ensureTokenInitialized();

  try {
    const response = await fetch(backendURL + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetAllMasterTicket($pageNumber: Int, $pageSize: Int, $filters: MasterFilterInput, $search: String, $dateRange: DateRangeInput) {
            getAllMasterTicket(pageNumber: $pageNumber, pageSize: $pageSize, search: $search, filters: $filters, dateRange: $dateRange) {
              data {
                ticket_id,
                title,
                description,
                ticket_number,
                note_ticket,
                due_date,
                status_id,
                create_date,
                create_by
              },
              response {
                errMsg,
                status
              }
              totalPages
            }
          }
        `,
        variables: {
          pageNumber: pageNumber,
          pageSize: 3,
          search: search,
          filters: {
            status_id:
              {
                Open: '1',
                Close: '2',
                'On Hold': '3',
                'On Progress': '4',
              }[filter] || undefined,
          },
          dateRange: {
            start: dateRange.start,
            end: dateRange.end,
          },
        },
      }),
    });

    const result = await response.json();
    setTicketData(result.data.getAllMasterTicket.data);
    setTotalPages(result.data.getAllMasterTicket.totalPages);
  } catch (error) {
    console.error('Error fetching ticket data:', error);
  }
};

export async function getAttachmentByID(
  id: string,
  setFileAttachment: (data: Attachment[]) => void
) {
  await ensureTokenInitialized(); // Ensure token is initialized before making the request.

  const query = `
    query GetAttachmentByID($getAttachmentByIdId: String) {
      getAttachmentByID(id: $getAttachmentByIdId) {
        data {
          ticket_id
          url_attachment
          name_attachment
          note_attachment
        }
      }
    }
  `;

  const variables = {
    getAttachmentByIdId: id,
  };

  try {
    const response = await fetch(backendURL + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    const result = await response.json();
    setFileAttachment(result.data.getAttachmentByID.data);

    return result;
  } catch (error) {
    console.error('Error fetching attachment:', error);
    throw error;
  }
}

export async function getUserByID(
  id: string,
  setAuthor: (data: string) => void
) {
  await ensureTokenInitialized(); // Ensure token is initialized before making the request.

  const query = `
    query GetUserById($getUserByIdId: String) {
      getUserById(id: $getUserByIdId) {
        data {
          nama
          email
        }
      }
    }
  `;

  const variables = {
    getUserByIdId: id,
  };

  try {
    const response = await fetch(backendURL + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    const result = await response.json();
    setAuthor(result.data.getUserById.data?.nama);
    return result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
