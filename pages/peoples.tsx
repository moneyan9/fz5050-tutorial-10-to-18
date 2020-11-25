import { GetServerSideProps } from "next";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export interface Person {
    id: number;
    name: string;
    details: string;
}


interface PeoplesProps {
    persons: Person[];
}


const Peoples = ({ persons }: PeoplesProps) => {

    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">name</TableCell>
                            <TableCell align="right">details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default Peoples

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    /*
       const db = await open(
           {filename:'./mydb.sqlite',
           driver: sqlite3.Database}
       );
    
       const persons = await db.all('SELECT * FROM person');
    */

    //SQLをたたいてもOKだが、 作成したAPIをたたいてもいい。
    const response = await fetch('http://localhost:3000/api/people');
    const persons = await response.json();

    return {
        props: { persons }
    };
}