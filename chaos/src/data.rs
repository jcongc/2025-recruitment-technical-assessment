use axum::{ http::StatusCode, response::IntoResponse, Json };
use serde::{ Deserialize, Serialize };

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    // Calculate sums and return response
    let mut string_len = 0;
    let mut int_sum = 0;
    println!("hello123");
    for item in request.data {
        match item {
            DataItem::String(s) => {
                string_len += s.len();
            }
            DataItem::Int(i) => {
                int_sum += i;
            }
        }
    }

    let response = DataResponse {
        string_len,
        int_sum,
    };

    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    data: Vec<DataItem>,
}

#[derive(Serialize)]
pub struct DataResponse {
    string_len: usize,
    int_sum: i32,
    // Add any fields here
}

#[derive(Deserialize)]
#[serde(untagged)]
enum DataItem {
    String(String),
    Int(i32),
}
