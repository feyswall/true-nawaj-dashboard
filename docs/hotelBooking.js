
  // table  name "properties"
  type Property = {
    id: string;
    name: string;
    address: string;
    description: string;
    type: 'hotel' | 'apartment';
    created_at: string;
    updated_at: string;
  };

  type Room = {
    id: string;
    property_id: number;
    room_number: string;
    type: 'single' | 'double' | 'suite' | string;
    price: number;
    description: string;
    created_at: string;
    updated_at: string;
  };

  type Booking = {
    id: string;
    property_id: number;
    room_id: number;
    customer_id: number;
    check_in_date: string;
    check_out_date: string;
    status: 'confirmed' | 'cancelled';
    created_at: string;
    updated_at: string;
    payment?: Payment;
  };

  type Customer = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };

  type Payment = {
    id: string;
    booking_id: number;
    amount: number;
    payment_date: string;
    payment_method: 'credit_card' | 'cash' | 'online';
    status: 'paid' | 'pending';
    created_at: string;
    updated_at: string;
  };

  type feature = {
    id: string;
    description: String;
    name: string;
    created_at: string;
    updated_at: string;
  };

  type RoomFeature = {
    'room_id': string,
    'feature_id': string,
  };

  type Review = {
    id: string;
    property_id: number;
    customer_id: number;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
  };

  type Owner = {
    id: string;
    name: string;
    contact_info: string;
    created_at: string;
    updated_at: string;
  };



  {
    "properties": [
      {
        "id": 1,
        "name": "Ocean View Hotel",
        "address": "123 Beach Road",
        "description": "A luxury hotel with ocean views.",
        "type": "hotel",
        "created_at": "2024-10-20T12:00:00",
        "updated_at": "2024-10-20T12:00:00",
        "rooms": [
          {
            "id": 101,
            "room_number": "101",
            "type": "double",
            "price": 150.00,
            "description": "A double room with a sea view.",
            "created_at": "2024-10-20T12:00:00",
            "updated_at": "2024-10-20T12:00:00",
            "features": [
              {
                "id": 1,
                "name": "Wi-Fi"
              },
              {
                "id": 2,
                "name": "Air Conditioning"
              }
            ],
            "bookings": [
              {
                "id": 1,
                "customer_id": 1,
                "check_in_date": "2024-11-01",
                "check_out_date": "2024-11-05",
                "status": "confirmed",
                "created_at": "2024-10-10T12:00:00",
                "updated_at": "2024-10-10T12:00:00",
                "payment": {
                  "id": 1,
                  "amount": 750.00,
                  "payment_date": "2024-10-15T12:00:00",
                  "payment_method": "credit_card",
                  "status": "paid"
                }
              }
            ]
          }
        ],
        "bookings": [
          {
            "id": 1,
            "room_id": 101,
            "customer_id": 1,
            "check_in_date": "2024-11-01",
            "check_out_date": "2024-11-05",
            "status": "confirmed",
            "created_at": "2024-10-10T12:00:00",
            "updated_at": "2024-10-10T12:00:00"
          }
        ],
        "owner": {
          "id": 1,
          "name": "John Doe",
          "contact_info": "john.doe@example.com"
        },
        "reviews": [
          {
            "id": 1,
            "customer_id": 1,
            "rating": 5,
            "comment": "Excellent stay with amazing views!",
            "created_at": "2024-10-20T12:00:00",
            "updated_at": "2024-10-20T12:00:00"
          }
        ]
      }
    ],
    "customers": [
      {
        "id": 1,
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane.smith@example.com",
        "phone_number": "+123456789",
        "created_at": "2024-10-01T12:00:00",
        "updated_at": "2024-10-01T12:00:00",
        "bookings": [
          {
            "id": 1,
            "property_id": 1,
            "room_id": 101,
            "check_in_date": "2024-11-01",
            "check_out_date": "2024-11-05",
            "status": "confirmed",
            "created_at": "2024-10-10T12:00:00",
            "updated_at": "2024-10-10T12:00:00"
          }
        ],
        "reviews": [
          {
            "id": 1,
            "property_id": 1,
            "rating": 5,
            "comment": "Excellent stay with amazing views!",
            "created_at": "2024-10-20T12:00:00",
            "updated_at": "2024-10-20T12:00:00"
          }
        ]
      }
    ],
    "features": [
      {
        "id": 1,
        "name": "Wi-Fi",
        "description": "Third generation wi-fi equped do connect ay device",
        "created_at": "2024-10-01T12:00:00",
        "updated_at": "2024-10-01T12:00:00"
      },
      {
        "id": 2,
        "name": "Air Conditioning",
        "created_at": "2024-10-01T12:00:00",
        "updated_at": "2024-10-01T12:00:00"
      }
    ],
    "room_feature": [
      {
        "room_id": 1,
        "feature_id": 2
      }
    ],
    "payments": [
      {
        "id": 1,
        "booking_id": 1,
        "amount": 750.00,
        "payment_date": "2024-10-15T12:00:00",
        "payment_method": "credit_card",
        "status": "paid",
        "created_at": "2024-10-15T12:00:00",
        "updated_at": "2024-10-15T12:00:00"
      }
    ]
  }


  https://chatgpt.com/share/671723e9-9ee0-800c-b504-00889e68ffc5
