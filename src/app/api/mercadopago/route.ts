import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Inicializar MercadoPago con el access token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hours, totalPrice } = body;

    const price = Number(totalPrice);

    // ✅ Validación correcta
    if (!hours || !price || isNaN(price)) {
      return NextResponse.json(
        { error: "Parámetros inválidos" },
        { status: 400 }
      );
    }

    const preference = new Preference(client);

    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: "devops-hours",
            title: `Servicio DevOps - ${hours} hora(s)`,
            description:
              "Consultoría DevOps especializada, CI/CD, Infraestructura Cloud",
            quantity: 1,
            unit_price: price, // ✅ NUMBER
            currency_id: "COP",
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}?status=success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}?status=pending`,
        },
        auto_return: "approved",
        statement_descriptor: "DevOpsPro",
        external_reference: `devops-${hours}h-${Date.now()}`,
      },
    });

    return NextResponse.json({
      id: preferenceData.id,
      init_point: preferenceData.init_point,
    });
  } catch (error) {
    console.error("Error creando preferencia de MercadoPago:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
``
