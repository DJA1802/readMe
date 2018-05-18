import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AnalyticsTable = ({ headers, data, displayKeys, idRoute }) => {
  const dataKeys = data && data.length ? Object.keys(data[0]) : null;

  console.log(dataKeys);
  console.log(data);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {headers
            ? headers.map((header, idx) => (
                <Table.HeaderCell key={idx}>{header}</Table.HeaderCell>
              ))
            : null}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data
          ? data.map((datum, dataIdx) => (
              <Table.Row
                key={dataIdx}
                className={datum.deleted ? 'deletedData' : ''}
              >
                {dataKeys
                  ? dataKeys.map(
                      (dataKey, keyIdx) =>
                        (displayKeys.indexOf(dataKey) !== -1 ? (
                          <Table.Cell key={keyIdx}>
                            {idRoute && !datum.deleted ? (
                              <Link to={`${idRoute}/${datum.id}`}>
                                {datum[dataKey]}
                              </Link>
                            ) : (
                              datum[dataKey]
                            )}
                          </Table.Cell>
                        ) : null)
                    )
                  : null}
              </Table.Row>
            ))
          : null}
      </Table.Body>
    </Table>
  );
};

export default AnalyticsTable;
