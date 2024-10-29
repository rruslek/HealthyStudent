import React, { useState } from 'react';
import { Paper, Grid, Card, Typography, Avatar, Stack, Checkbox } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Boards = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [boards, setBoards] = useState([
        { id: 1, title: "Новые", items: [{ id: 1, title: "Открыть порты" }, { id: 2, title: "Настроить сервер" }] },
        { id: 2, title: "В работе", items: [] },
        { id: 3, title: "Выполнено", items: [{ id: 1, title: "Перенести бэкенд и фронтенд" }] }
    ]);


    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dropHandler(e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
        if (e.target.parentElement && e.target.parentElement.classList.contains('item')) {
            e.target.parentElement.style.boxShadow = 'none'
        }
    }

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.classList.contains('item')) {
            e.target.style.boxShadow = '0 4px 3px black'
        }
        if (e.target.parentElement && e.target.parentElement.classList.contains('item')) {
            e.target.parentElement.style.boxShadow = '0 4px 3px black'
        }

    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
        if (e.target.parentElement && e.target.parentElement.classList.contains('item')) {
            e.target.parentElement.style.boxShadow = 'none'
        }
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
        if (e.target.parentElement && e.target.parentElement.classList.contains('item')) {
            e.target.parentElement.style.boxShadow = 'none'
        }
    }

    function dropCardHandler(e, board) {
        if (e.target.classList.contains('board')) {
            board.items.push(currentItem)
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
            if (e.target.parentElement && e.target.parentElement.classList.contains('item')) {
                e.target.parentElement.style.boxShadow = 'none'
            }
            e.target.style.boxShadow = 'none'
        }
    }

    return (
        <Grid container spacing={2} sx={{ height: '100%' }}>
            {boards.map(board =>
                <Grid item xs={4}>
                    <Card
                        key={board.id} item={board}
                        className='board'
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, board)}
                        elevation={8}
                        sx={{ backgroundColor: 'lightGrey', height: '100%' }} >
                        <Typography gutterBottom variant="h6" component="div" sx={{ backgroundColor: 'lightGreen', textAlign: 'center' }}>
                            {board.title}
                        </Typography>
                        {board.items.map(item => 
                            <Paper
                                key={item.id} item={item}
                                draggable={true}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                className='item'
                                elevation={3} sx={{ mx: 1, my: 2, py: 1 }}>
                                <Stack direction="row" spacing={2}>
                                    <Checkbox
                                        color="success"
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    {item.title}
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </Stack>
                            </Paper>)}
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}

export { Boards };