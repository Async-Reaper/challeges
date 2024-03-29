import { Button } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { postApi } from "../../../services/PostService";
import { setAcceptStatus } from "../../../store/reducers/challengesSlice";
import ChallengeWrapper from "../../../shared/ui/ChallengeWrapper/ChallengeWrapper";
import { IChallengeMembersProps } from "./ChallengeMembers.types";

const ChallengeMembers: FC<IChallengeMembersProps> = ({ challengeMembers }) => {
  const { acceptStatus } = useTypedSelector((state) => state.challenges);
  const [acceptChallenge, {}] = postApi.useAcceptChallengeMutation();
  const dispatch = useTypedDispatch();
  const params = useParams();

  challengeMembers.map((member) => (member.username === localStorage.getItem("userName") ? dispatch(setAcceptStatus(true)) : null));

  return (
    <ChallengeWrapper>
      Challenge members:
      {challengeMembers.map((member) => (
        <li key={member.user_id}>{member.username}</li>
      ))}
      {acceptStatus ? null : (
        <Button type="submit" variant="contained" onClick={() => acceptChallenge(params.id!)}>
          Accept challenge
        </Button>
      )}
    </ChallengeWrapper>
  );
};

export default ChallengeMembers;
