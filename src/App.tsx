import { Col, Input, Row, Table } from "antd";
import React, { useEffect, useState, useCallback } from "react";

import { getPeopleList, Person } from "./api";
import columns from "./columns";

import "./App.css";



// export type AppProps = {
//   Person: any
// }

/* TODO: Implement debouncer */
let timer: NodeJS.Timeout | undefined;
function debounce(func: () => void, wait: number) {
  return () => {
    /* TODO */
    func();
  };
}

function App() {
  const [ data, setData ] = useState<Person[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);



  const filter = useCallback(() => {
    /* TODO: Implement search filter */
    // setIsLoading(true);
    // return(
    //   <div>
    //     key: {data}
    //   </div>
    // )
    
    console.log(data)

  }, [data]);

  const debouncedFilter = useCallback(() =>{
    debounce(filter, 1000)();
  }, [ filter ]);

  const fetchPeople = useCallback(() => {
    setIsLoading(true);
    getPeopleList()
      .then(response => {
        setData(response);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return (
    <div className="App">
      <h1>People</h1>
      <Row className="Row">
        <Col>
          <Input 
          allowClear placeholder="search people" 
          onChange={ filter }
          />
        </Col>
      </Row>
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
    </div>
  );
}

export default App;
