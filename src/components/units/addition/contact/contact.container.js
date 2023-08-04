import * as S from "./contact.styles";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ContactTripyle() {
    return(
        <>
        <S.MainWrapper>
            <S.ContactImg src="/img/Contact.png"></S.ContactImg>
        </S.MainWrapper>
        </>
    );
}