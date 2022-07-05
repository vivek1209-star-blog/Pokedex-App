import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Toolbar,
    AppBar,
    TextField,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react'
import { Image_Api_Url, toFirstCharUppercase } from '../Config/Index'
import Api from '../Services/Api'
import SearchIcon from "@material-ui/icons/Search";
import ReactLoading from 'react-loading';


const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
}));

export const Pokedex = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const pokeData = async () => {
        try {
            setLoading(true);
            const res = await Api.get(`/pokemon/?limit=10`)
            setNextUrl(res.next);
            setPreviousUrl(res.previous);
            let newPokemonData = []
            res.data.results.forEach((pokemon, index) => {
                newPokemonData[index + 1] = {
                    id: index + 1,
                    name: pokemon.name,
                    sprite: `${Image_Api_Url}/${index + 1}.png`,
                };
            });
            setPokemonData(newPokemonData)

            setLoading(false);
        } catch (error) {
            console.log('error ==>', error)
            setLoading(false);

        }
    }

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };




    useEffect(() => {
        pokeData();
    }, []);

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
            <>
                {loading ? <div
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        background: '#00000033',
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                        }}
                    >
                        {/* {isLoadingForActiveDormant ? <ReactLoading type="spokes" color="#2626D9" /> : <></>} */}
                        <ReactLoading type="spokes" color="#2626D9" />
                    </div>
                </div> : (
                    <>
                        <Grid item xs={4} key={pokemonId}>
                            <Card onClick={() => history.push(`/${id}`)}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={sprite}
                                    style={{ width: "130px", height: "130px" }}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            className={classes.searchInput}
                            onChange={handleSearchChange}
                            label="Pokemon"
                            variant="standard"
                        />
                    </div>
                    <Typography className={classes.title}>Pokedex</Typography>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(
                        (pokemonId) =>
                            pokemonData[pokemonId].name.includes(filter) &&
                            getPokemonCard(pokemonId)
                    )}
                </Grid>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
