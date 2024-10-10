"use client";

import FormContainer from "@/components/forms/form-container";
import CustomDataTable from "@/components/table/custom-data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TextLabelInput from "../input/input-type2";
import TextLabelSelect from "../select/text-label-select";

const data = [
  { nombres: "John", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "John", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
];

const headers = [
  { key: "nombres", label: "Nombres" },
  { key: "apellidoPaterno", label: "Apellido paterno" },
  { key: "apellidoMaterno", label: "Apellido materno" },
  { key: "dni", label: "DNI" },
];

function FormDatosPersonales() {
  const countries = [
    { value: "es", label: "España" },
    { value: "fr", label: "Francia" },
    { value: "de", label: "Alemania" },
    { value: "it", label: "Italia" },
    { value: "uk", label: "Reino Unido" },
    { value: "pt", label: "Portugal" },
    { value: "nl", label: "Países Bajos" },
    { value: "be", label: "Bélgica" },
    { value: "ch", label: "Suiza" },
    { value: "at", label: "Austria" },
    { value: "se", label: "Suecia" },
    { value: "no", label: "Noruega" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <FormContainer title="Datos personales">
        <div className="flex flex-col gap-5">
          <TextLabelInput id="nombre" label="Nombre" isRequired placeholder="Juan" />
          <div className="flex gap-5">
            <TextLabelSelect label="Departamento" isRequired options={countries} placeholder="Seleccione" />
            <TextLabelSelect disabled label="Provincia" isRequired options={countries} placeholder="Seleccione" />
            <TextLabelSelect disabled label="Distrito" isRequired options={countries} placeholder="Seleccione" />
          </div>
        </div>
      </FormContainer>
      {/* <FormContainer title="Datos del cónjugue">
        <div className="flex flex-col gap-5">
          <FloatingLabelInput id="1" label="Nombre" required />
          <FloatingLabelInput id="2" label="Apellido Paterno" required />
          <FloatingLabelInput id="3" label="Apellido Materno" required />
          <FloatingLabelInput id="4" label="DNI" required />
        </div>
      </FormContainer> */}
      <FormContainer title="Datos de los hijos">
        <div className="flex flex-col gap-5">
          <CustomDataTable data={data} headers={headers} itemsPerPageOptions={[5, 10, 15, 20]} initialItemsPerPage={5} />
          <div className="flex justify-end w-full">
            <Button className="gap-2 w-fit text-white">
              <Plus className="w-5" />
              Agregar hijo
            </Button>
          </div>
          {/* <div className="flex flex-col gap-5">
            <FloatingLabelInput id="nombre-hijo" label="Nombres" required />
            <FloatingLabelInput id="ap-pat-hijo" label="Apellido Paterno" required />
            <FloatingLabelInput id="ap-mat-hijo" label="Apellido Materno" required />
            <FloatingLabelInput id="dni-hijo" label="DNI" required />
          </div> */}
        </div>
      </FormContainer>
    </div>
  );
}

export default FormDatosPersonales;
