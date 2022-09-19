import React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import Countdown from "react-countdown";

interface CountDownProps {
  date: number;
}

export const CountDown: React.FC<CountDownProps> = (props) => {
  const { date } = props;
  const color = useColorModeValue("teal", "teal.200");

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
    completed: any;
    props: any;
  }) => {
    return (
      <Text color={color}>
        {days}:{hours}:{minutes}:{seconds}
      </Text>
    );
  };

  return <Countdown date={date} renderer={renderer} />;
};

export default CountDown;
