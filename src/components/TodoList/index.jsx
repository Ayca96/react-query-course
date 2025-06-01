import React from "react";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const {data, isPending, isError, error, fetchStatus}= useQuery({
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
        response.json()
      ),
      queryKey:"todos", 
      
      //todos sadece bu sorguyu tanımlamak için kullanılan key/string.
      // React Query’nin cache ve veri yönetimi için zorunlu.
      // API endpoint’ten veya başka bir yerden otomatik gelmez, sen veriyorsun.
      
  });
  if(isPending){
    return <div>
      loading....</div>
  }

  if (isError) return <div>{error.message}</div>;

  // fetchStatus === "fetching" Veri çekme işlemi devam ediyor (yeni veri çekiliyor)
  // fetchStatus === "paused"  Veri çekme işlemi geçici durduruldu (örn. offline mod)
  // fetchStatus === "idle" 	Veri çekme işlemi başlamadı, sorgu hazır durumda
  
  // fetchStatus, sorgunun veri çekme sürecinin durumunu belirtir.status ile karıştırma; 
  // status genellikle loading, error, success gibi genel sonucu gösterir.
  // fetchStatus ise veri çekme işleminin detayını (aktif mi, duraklatıldı mı) belirtir.
  

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold items-center mb-6">My Todo List</h1>
        <ul>
          {data?.map((todo) => (
            <li
              key={todo.id}
              className="flex  mb-4 bg-gray-200 rounded-md  items-center p-2"
            >
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => {}}
                className="mr-2 h-4 w-4"
              />
              <span className={todo.isCompleted ? "line-through" : undefined}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
