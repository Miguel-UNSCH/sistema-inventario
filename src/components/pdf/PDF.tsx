/* eslint-disable jsx-a11y/alt-text */
import { Document, Text, Page, StyleSheet, Image, View } from "@react-pdf/renderer";

// Estilos centralizados
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  paragraph: {
    fontSize: 10,
    textAlign: "justify",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
  },
  clientInfo: {
    border: "1px solid #000",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    display: "flex",
    gap: 5,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #000",
  },
  productRowNoborder: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    fontSize: 10,
    fontWeight: 600,
    padding: 10,
    textAlign: "center",
  },
  cellDesc: {
    fontSize: 10,
    fontWeight: 600,
    padding: 10,
    textAlign: "left",
  },
  cellNum: {
    fontSize: 10,
    fontWeight: 600,
    padding: 10,
    textAlign: "right",
  },
  borderBottom: {
    borderBottom: "1px solid #000",
  },
  borderRight: {
    borderRight: "1px solid #000",
  },
  totalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalRow: {
    display: "flex",
    flexDirection: "row",
  },
  totalText: {
    fontSize: 10,
    fontWeight: 600,
    width: 200,
    textAlign: "right",
    marginRight: 10,
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 600,
    width: 100,
    textAlign: "right",
  },
});

const convertirNumeroATexto = (num: number) => {
  const unidades = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
  const decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
  const centenas = [
    "",
    "CIENTO",
    "DOSCIENTOS",
    "TRESCIENTOS",
    "CUATROCIENTOS",
    "QUINIENTOS",
    "SEISCIENTOS",
    "SETECIENTOS",
    "OCHOCIENTOS",
    "NOVECIENTOS",
  ];

  let entero = Math.floor(num); // Parte entera
  const decimales = Math.round((num - entero) * 100); // Parte decimal redondeada a dos dígitos

  // Función auxiliar para convertir hasta 999
  const convertirCentenas = (n: number) => {
    if (n === 0) return "";
    if (n === 100) return "CIEN";
    let texto = centenas[Math.floor(n / 100)];
    const resto = n % 100;
    if (resto <= 9) texto += " " + unidades[resto];
    else if (resto <= 29)
      texto += " " + (resto === 20 ? "VEINTE" : decenas[Math.floor(resto / 10)] + (resto % 10 ? " Y " + unidades[resto % 10] : ""));
    else texto += " " + decenas[Math.floor(resto / 10)] + (resto % 10 ? " Y " + unidades[resto % 10] : "");
    return texto.trim();
  };

  let texto = "";

  // Manejo de miles
  if (entero >= 1000) {
    const miles = Math.floor(entero / 1000);
    texto += miles === 1 ? "MIL" : convertirCentenas(miles) + " MIL";
    entero = entero % 1000; // Resto después de miles
  }

  texto += " " + convertirCentenas(entero);

  // Manejo de decimales
  return `${texto.trim()} CON ${decimales < 10 ? "0" + decimales : decimales}/100 SOLES`;
};

interface ComprobanteDetalle {
  data: {
    numero: string;
    fechaEmision: string; // Formato 'dd-mm-yyyy'
    total: number;
    subTotal: number;
    igv: number;
    cliente: {
      tipo: string;
      nombre: string;
      identifier: string;
      direccion: string;
      telefono: string;
    };
    productos: {
      cantidad: number;
      unidad: string;
      descripcion: string;
      precioUnitario: number;
      subtotal: number;
    }[];
  };
}

function PDF({ data }: ComprobanteDetalle) {
  console.log(data);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo/logo.png" style={styles.logo} />
          <View style={{ fontSize: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>GRF COMPANY SAC</Text>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>GREEN FABRIC COMPANY S.A.C.</Text>
            <Text>AV. LAS FLORES DE PRIMAVERA NRO. 954- INT. 201 COO.</Text>
            <Text>LAS FLORES LIMA - LIMA - SAN JUAN DE LURIGANCHO</Text>
          </View>
          <View style={{ border: "1px solid #000", borderRadius: 10, padding: 10, alignItems: "center", fontSize: 12 }}>
            <Text>R.U.C. 20562862847</Text>
            <Text>{data.cliente.tipo === "natural" ? "BOLETA DE VENTA" : "FACTURA"}</Text>
            <Text>ELECTRÓNICA</Text>
            <Text>N° {data.numero}</Text>
          </View>
        </View>

        <View style={styles.clientInfo}>
          <Text style={styles.paragraph}>
            {data.cliente.tipo === "natural" ? "CLIENTE" : "RAZON SOCIAL"}: {data.cliente.nombre}
          </Text>
          <Text style={styles.paragraph}>
            {data.cliente.tipo === "natural" ? "DNI" : "RUC"}: {data.cliente.identifier}
          </Text>
          <Text style={styles.paragraph}>DIRECCIÓN : {data.cliente.direccion}</Text>
          <Text style={styles.paragraph}>TELÉFONO : {data.cliente.telefono}</Text>
          <Text style={styles.paragraph}>FECHA DE EMISIÓN : {data.fechaEmision}</Text>
        </View>

        <View style={{ border: "1px solid #000", borderRadius: 10 }}>
          <View style={[styles.productRow, styles.borderBottom]}>
            <Text style={[styles.cell, styles.borderRight, { width: "14%" }]}>CANTIDAD</Text>
            <Text style={[styles.cell, styles.borderRight, { width: "10%" }]}>U.N.</Text>
            <Text style={[styles.cell, styles.borderRight, { width: "60%" }]}>DESCRIPCIÓN</Text>
            <Text style={[styles.cell, styles.borderRight, { width: "12%" }]}>PRECIO UNIT.</Text>
            <Text style={[styles.cell, { width: "14%" }]}>SUBTOTAL</Text>
          </View>

          {data.productos.map((producto, index) => (
            <View key={index} style={index === data.productos.length - 1 ? styles.productRowNoborder : styles.productRow}>
              <Text style={[styles.cellNum, styles.borderRight, { width: "14%" }]}>{producto.cantidad}</Text>
              <Text style={[styles.cell, styles.borderRight, { width: "10%" }]}>{producto.unidad}</Text>
              <Text style={[styles.cellDesc, styles.borderRight, { width: "60%" }]}>{producto.descripcion}</Text>
              <Text style={[styles.cellNum, styles.borderRight, { width: "12%" }]}>{producto.precioUnitario.toFixed(2)}</Text>
              <Text style={[styles.cellNum, { width: "14%" }]}>{producto.subtotal.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>SON: {convertirNumeroATexto(data.total)}</Text>

        <View style={styles.totalContainer}>
          <View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>TOTAL :</Text>
              <Text style={styles.totalValue}>{data.total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>SUBTOTAL :</Text>
              <Text style={styles.totalValue}>{data.subTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>IGV (18%) :</Text>
              <Text style={styles.totalValue}>{data.igv.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>TOTAL A PAGAR :</Text>
              <Text style={styles.totalValue}>{data.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDF;
