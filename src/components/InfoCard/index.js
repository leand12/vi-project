import React from 'react';
import { Button, Grid, Card } from '@mui/material';
import useCompareStore from 'stores/useCompareStore';
import "./style.css";
import StatsTable from "../StatsTable";
import TypeTable from "../TypeTable";


export default function InfoCard(props) {

    const pokemon = useCompareStore(state => state[props.type]);

    //const pokemon = {"attack": 47, "defense": 52, "hp": 55, "name": "Nidoran♂", "pokedex_number": 29, "sp_attack": 40, "sp_defense": 40, "speed": 41, "type1": "poison", "type2": "", "generation": 1, "is_legendary": 0}

    const getImage = (name) => {
        name = name.replaceAll(" ", "-");
        name = name.replaceAll(".", "");
        name = name.replaceAll(":", "");
        name = name.replaceAll("♀", "-f");
        name = name.replaceAll("♂", "-m");
        name = name.replaceAll("é", "e");
        name = name.replaceAll("'", "");
        name = name.toLowerCase();
        return "https://img.pokemondb.net/artwork/" + name + ".jpg";
    }

    const addToCompare = (pos) => {
        if (pos == 1)
            useCompareStore.getState().setCompare1(pokemon);
        else if (pos == 2)
            useCompareStore.getState().setCompare2(pokemon);
    }

    const addToTeam = (pokemon) => {
        useCompareStore.getState().setTeam(pokemon);
    }

    const getCardColor = (opacity = 1) => {
        if (props.type === 'compare1') {
            return "rgba(204, 51, 63, " + opacity + ")";
        } else if (props.type === 'compare2') {
            return "rgba(237, 201, 81, " + opacity + ")";
        } else {
            return '';
        }
    }

    return (
        Object.keys(pokemon).length ?
            <Card variant="outlined" className={props.comparable ? "card-info" : "card-info scatter"}
                style={{ borderColor: getCardColor() }}>

                <Grid container>
                    <Grid item xs={12} sm={5} md={12} lg={5}>
                        <h2 style={{ color: getCardColor(), fontWeight: 600 }}>{pokemon.name} #{pokemon.pokedex_number}</h2>
                        <img src={getImage(pokemon.name)} style={{ width: "200px", height: "200px" }}></img>
                    </Grid>
                    <StatsTable data={pokemon} />
                </Grid>

                <TypeTable types={[pokemon.type1, pokemon.type2]} />
                <Button style={{ margin: 8, backgroundColor: "green" }} variant="contained"
                            onClick={() => { addToTeam(pokemon) }}> Add to Team</Button>
                {props.comparable ?
                    <div style={{ margin: "8px auto" }}>
                        <Button style={{ margin: 8, backgroundColor: "rgb(204, 51, 63)" }} variant="contained"
                            onClick={() => { addToCompare(1) }}> Select for Compare 1</Button>
                        <Button style={{ margin: 8, backgroundColor: "rgb(237, 201, 81)" }} variant="contained"
                            onClick={() => { addToCompare(2) }}> Select for Compare 2</Button>
                    </div> : <></>
                }
            </Card>
            : <></>
    )
}
