import React from "react";
import {
    styled,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
    Divider,
    Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./HostCheckInCard.css";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

function HostCheckInCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Grid container direction="row" justifyContent="center">
                <Card sx={{ maxWidth: 345 }}>
                    <div className="host_checkin_card_outdate">
                        체크 아웃 예정 일자
                    </div>
                    <CardMedia
                        component="img"
                        height="194"
                        image=""
                        alt="체크인된 게스트 사진"
                    />
                    <CardContent>
                        <div className="host_checkin_card_guest_name">
                            체크인된 게스트 이름
                        </div>
                        <div className="host_checkin_card_guest_gender">
                            체크인된 게스트 성별
                        </div>
                        <div className="host_checkin_card_room_name">
                            체크인된 객실 이름
                        </div>
                        <div className="host_checkin_card_indate">
                            게스트 체크인 완료일
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography>
                                게스트 체크인 특이사항들....
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <div className="host_checkin_card_outdate">
                        체크 아웃 예정 일자2
                    </div>
                    <CardMedia
                        component="img"
                        height="194"
                        image=""
                        alt="체크인된 게스트 사진2"
                    />
                    <CardContent>
                        <div className="host_checkin_card_guest_name">
                            체크인된 게스트 이름2
                        </div>
                        <div className="host_checkin_card_guest_gender">
                            체크인된 게스트 성별2
                        </div>
                        <div className="host_checkin_card_room_name">
                            체크인된 객실 이름2
                        </div>
                        <div className="host_checkin_card_indate">
                            게스트 체크인 완료일2
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography>
                                게스트 체크인 특이사항들....
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <div className="host_checkin_card_outdate">
                        체크 아웃 예정 일자3
                    </div>
                    <CardMedia
                        component="img"
                        height="194"
                        image=""
                        alt="체크인된 게스트 사진3"
                    />
                    <CardContent>
                        <div className="host_checkin_card_guest_name">
                            체크인된 게스트 이름3
                        </div>
                        <div className="host_checkin_card_guest_gender">
                            체크인된 게스트 성별3
                        </div>
                        <div className="host_checkin_card_room_name">
                            체크인된 객실 이름3
                        </div>
                        <div className="host_checkin_card_indate">
                            게스트 체크인 완료일3
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography>
                                게스트 체크인 특이사항들....
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </div>
    );
}

export default HostCheckInCard;
