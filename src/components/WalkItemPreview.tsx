import React, { useEffect, useState } from "react";
import { formatDate, getMinAndSec, getTimeDiff } from "../helpers";
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
} from "@ionic/react";

import { getUnitDistance } from "../helpers";
import { getRemoteUserData } from "../firebase";
import { useAuth } from "../auth";
import {
  timerOutline as timeIcon,
  footstepsOutline as walkIcon,
} from "ionicons/icons";

const WalkItemPreview: React.FC<{
  title?: string;
  colour?: string;
  description?: string;
  start?: string;
  end?: string;
  steps?: number;
  distance?: number;
  coverImage?: string;
  type?: string;
  userId?: string;
}> = (props) => {
  const { userId } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  let time = null;
  if (props.start && props.end) {
    const timeDiff = getTimeDiff(props.start, props.end);
    const timeResult = getMinAndSec(timeDiff);
    time = timeResult;
  }

  useEffect(() => {
    if (props.userId) {
      getRemoteUserData(props.userId).then((data) => {
        loadUserData(data);
      });
    }
  }, [props.userId]);

  const loadUserData = (userData: any) => {
    setDisplayName(userData?.displayName);
    setProfilePic(userData?.profilePic);
  };

  return (
    <>
      <IonCard className="walk-item ion-no-margin">
        {props.coverImage && (
          <img
            className="walk-item__cover-image"
            src={props.coverImage}
            alt={props.title}
          />
        )}
        {props.type && props.type !== "user" && (
          <IonBadge
            className="ion-text-uppercase walk-item__type"
            color={props.type === "curated" ? "secondary" : "primary"}
          >
            {props.type}
          </IonBadge>
        )}
        {profilePic && (
          <img
            src={profilePic}
            alt=""
            className="walk-item__profile-badge profile-badge__image profile-badge__image--small"
            width="40"
            height="40"
          />
        )}
        <IonCardContent
          className="walk-item__content"
          style={{
            borderBottom: "solid 6px " + props.colour,
          }}
        >
          <IonText className="text-heading">
            <h2>
              <strong>{props.title}</strong>
            </h2>
            <p className="small-print">
              {props.userId !== userId && (
                <>
                  by {displayName}
                  <br />
                </>
              )}
              <span className="ion-text-uppercase">
                {props.start && formatDate(props.start, false)}
              </span>
              {props.distance && props.distance > 0.1 && (
                <span>
                  , {props.distance.toFixed(2)} {getUnitDistance()}
                </span>
              )}
              {props.description && <span> — {props.description}</span>}
            </p>
          </IonText>
          {props.userId === userId &&
            props.steps &&
            props.steps > 0 &&
            time &&
            time["min"] > 0 && (
              <IonText
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <IonIcon icon={walkIcon} />
                &nbsp;
                {props.steps}&nbsp;
                <span className="smallprint">steps</span>
                <span style={{ marginLeft: "10px" }}>
                  <IonIcon icon={timeIcon} />
                  &nbsp;
                  {time["min"]}&nbsp;
                  <span className="smallprint">min</span>
                </span>
              </IonText>
            )}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default WalkItemPreview;
