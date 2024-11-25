export function getData() {
  const data = [
    {
      "client_id": "C012",
      "client_name": "UVW Enterprises",
      "contact_name": "Rachel Green",
      "email": "rachel@uvw.com",
      "phone": "9876543260",
      "address": "5678 Maple St, City",
      "payment_due_date": "2024-12-01",
      "total_due_amount": 19000,
      "status": "completed",
      "detailInfo": {
        "due": [
          {
            "initiatedDate": "2024-11-01",
            "totalDue": "1",
            "dueAmount": "19000"
          }
        ],
        "followUp": [
          {
            "followedBy": "Raj",
            "followedPerson": "Rachel Green",
            "followedDate": "2024-11-15",
            "collectDate": "2024-11-20",
            "comment": "Follow-up call made"
          }
        ],
        "completed": [
          {
            "collectedBy": "Raj",
            "collectedFrom": "Rachel Red",
            "collectedOn": "22/11/2024"
          }
        ]
      }
    },
    {
      "client_id": "C013",
      "client_name": "ABC Enterprises",
      "contact_name": "John Doe",
      "email": "john@abc.com",
      "phone": "9876543210",
      "address": "1234 Elm St, City",
      "payment_due_date": "2024-11-20",
      "total_due_amount": 30000,
      "status": "due",
      "detailInfo": {
        "due": [
          {
            "initiatedDate": "2024-06-01",
            "totalDue": "8",
            "dueAmount": "400000"
          }
        ],
        "followUp": [],
        "completed": []
      }
    },
    {
      "client_id": "C014",
      "client_name": "XYZ Ltd.",
      "contact_name": "Jane Smith",
      "email": "jane@xyz.com",
      "phone": "9876543220",
      "address": "5678 Oak St, City",
      "payment_due_date": "2024-11-22",
      "total_due_amount": 15000,
      "status": "completed",
      "detailInfo": {
        "due": [
          {
            "initiatedDate": "2024-11-01",
            "totalDue": "1",
            "dueAmount": "15000"
          }
        ],
        "followUp": [
          {
            "followedBy": "Geetha",
            "followedPerson": "Jane Smith",
            "followedDate": "2024-11-12",
            "collectDate": "2024-11-18",
            "comment": "Follow-up on payment"
          }
        ],
        "completed": [
          {
            "collectedBy": "Raj",
            "collectedFrom": "Jane Smith",
            "collectedOn": "23/11/2024"
          }
        ]
      }
    },
    {
      "client_id": "C015",
      "client_name": "LMN Corp.",
      "contact_name": "Mike Johnson",
      "email": "mike@lmn.com",
      "phone": "9876543230",
      "address": "2345 Pine St, City",
      "payment_due_date": "2024-11-28",
      "total_due_amount": 35000,
      "status": "followUp",
      "detailInfo": {
        "due": [
          {
            "initiatedDate": "2024-11-05",
            "totalDue": "1",
            "dueAmount": "35000"
          }
        ],
        "followUp": [
          {
            "followedBy": "Geetha",
            "followedPerson": "Mike Johnson",
            "followedDate": "2024-11-15",
            "collectDate": "2024-11-18",
            "comment": "Second follow-up"
          }
        ],
        "completed": []
      }
    }
  ]
  
  return data;
}
