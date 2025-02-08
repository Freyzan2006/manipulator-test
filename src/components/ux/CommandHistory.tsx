import React from 'react';
import { useFetchHistoryQuery } from '../../store/services/manipulatorApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CommandHistory: React.FC = () => {
  const { data: history, isLoading, error } = useFetchHistoryQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;
  console.log(history)
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Команда</TableCell>
            <TableCell>Оптимизированная команда</TableCell>
            <TableCell>Дата и время</TableCell>
            <TableCell>Расположение до</TableCell>
            <TableCell>Расположение после</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history?.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.command}</TableCell>
              <TableCell>{entry.optimize_command}</TableCell>
              <TableCell>{entry.date_time}</TableCell>
              <TableCell>{entry.before_position}</TableCell>
              <TableCell>{entry.after_position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommandHistory;
