import {
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
}

export const InputNumber: React.FC<InputNumberProps> = (props) => {
  const { value, onChange } = props;

  return (
    <NumberInput
      //   value={value}
      //   onChange={(value) => {
      //     onChange(Number(value));
      //   }}
      min={0}
      name="bnb_amount"
      display="flex"
      flexDirection="row"
      borderRadius="md"
      bg={useColorModeValue("gray.100", "gray.700")}
      _focusVisible={{
        borderColor: "#81e6d9",
        boxShadow: "0 0 0 1px #81e6d9",
      }}
    >
      <NumberDecrementStepper border="none">
        <IconButton icon={<AiOutlineMinus />} aria-label={"Minus"} />
      </NumberDecrementStepper>
      <NumberInputField
        placeholder="Input BNB Amount"
        border="none"
        textAlign="center"
        _focusVisible={{ border: "none", outline: "none" }}
      />
      <NumberIncrementStepper border="none">
        <IconButton icon={<AiOutlinePlus />} aria-label={"Minus"} />
      </NumberIncrementStepper>
    </NumberInput>
  );
};

export default InputNumber;
