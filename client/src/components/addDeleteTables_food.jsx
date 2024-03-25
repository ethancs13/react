import { useState, useEffect } from "react"
import { Container, Form, Col, Row } from "react-bootstrap";
import TableRows_food from "./tableRows_food"

function AddDeleteTableRows_food({ update, updateTotals }) {

    const [rowsData, setRowsData] = useState([]);
    const [totalsData, setTotalsData] = useState('');
    // Totals Section - useState
    const [onCardBillable, setOnCardBillable] = useState("");
    const [onCard, setOnCard] = useState("");
    const [outPocket, setOutPocket] = useState("");
    const [outPocketBillable, setOutPocketBillable] = useState("");
    const [ccTotal, setCCTotal] = useState("");
    const [oopTotal, setOOPTotal] = useState("");

    const addTableRows_food = (e) => {
        e.preventDefault();
        const { date, amount, restaurant, persons, title, reason, billable, PoRCC } = rowsData;

        const { onCardBillable, onCard, outPocket, outPocketBillable, ccTotal, oopTotal } = totalsData;

        const rowsInput = {
            date: date,
            amount: amount,
            restaurant: restaurant,
            persons: persons,
            title: title,
            reason: reason,
            billable: billable,
            PoRCC: PoRCC,
        }
        setRowsData([...rowsData, rowsInput])
        update(rowsData)

        const totalsInput = {
            onCardBillable: onCardBillable,
            onCard: onCard,
            outPocket: outPocket,
            outPocketBillable: outPocketBillable,
            ccTotal: ccTotal,
            oopTotal: oopTotal
        }
        setTotalsData([...totalsData, totalsInput])
        updateTotals(totalsData)
    }

    const deleteTableRows_food = (evnt, index) => {
        evnt.preventDefault();
        console.log(rowsData)
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
        update(rowsData)
    }

    const handleChange = (index, evnt) => {
        evnt.preventDefault();
        console.log(rowsData)
        const { name, value } = evnt.target;
        const newValue = value;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = newValue;
        setRowsData(rowsInput);
        update(rowsData);
        updateTotals(totalsData);
    };


    return (
        <tbody>

            <tr className="table_row">
                <th>Date</th>
                <th className="subtotal_col">Amount</th>
                <th className="citytax_col">Location</th>
                <th className="taxpercent_col">Persons</th>
                <th className="total_col">Title</th>
                <th>Reason</th>
                <th>PoRCC</th>
                <th>Billable</th>
                <th className="add-row"><button className="btn btn_add" onClick={(e) => addTableRows_food(e)} >+</button></th>
            </tr>

            <TableRows_food rowsData={rowsData} deleteTableRows={deleteTableRows_food} handleChange={handleChange} />


            {rowsData.length > 0 ?
                <Container>
                    <Row>
                        <Col className="billable-data">
                            <h3>Billable</h3>
                            <label htmlFor="onCardB">On PoR Card</label>
                            <input
                                type="text"
                                name="onCardB"
                                value={onCardBillable}
                                onChange={(e) =>
                                    setOnCardBillable(e.target.value)
                                }
                                required
                            />
                            <label htmlFor="outPocketB">Out of Pocket</label>
                            <input
                                type="text"
                                name="outPocketB"
                                value={outPocketBillable}
                                onChange={(e) =>
                                    setOutPocketBillable(e.target.value)
                                }
                                required
                            />
                        </Col>
                        <Col className="nonBillable-data">
                            <h3>Non-Billable</h3>
                            <label htmlFor="onCard">On PoR Card</label>
                            <input
                                type="text"
                                name="onCard"
                                value={onCard}
                                onChange={(e) => setOnCard(e.target.value)}
                                required
                            />
                            <label htmlFor="outPocket">Out of Pocket</label>
                            <input
                                type="text"
                                name="outPocket"
                                value={outPocket}
                                onChange={(e) => setOutPocket(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Row className="totals-data">
                            <h3>Totals</h3>
                            <label htmlFor="ccTotal">CC Total</label>
                            <input
                                type="text"
                                name="ccTotal"
                                value={ccTotal}
                                onChange={(e) => setCCTotal(e.target.value)}
                                required
                            />
                            <label htmlFor="oopTotal">OOP Total</label>
                            <input
                                type="text"
                                name="oopTotal"
                                value={oopTotal}
                                onChange={(e) => setOOPTotal(e.target.value)}
                                required
                            />
                        </Row>
                    </Row>
                </Container>
                :
                <></>
            }
        </tbody>

    )

}
export default AddDeleteTableRows_food

