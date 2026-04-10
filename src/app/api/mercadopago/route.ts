const price = Math.round(Number(totalPrice));

if (!hours || !price || isNaN(price)) {
  return NextResponse.json(
    { error: "Parámetros inválidos" },
    { status: 400 }
  );
}

const preferenceData = await preference.create({
  body: {
    items: [
      {
        id: "devops-hours",
        title: `Servicio DevOps - ${hours} hora(s)`,
        description: "Consultoría DevOps especializada, CI/CD, Infraestructura Cloud",
        quantity: 1,
        unit_price: price,
        currency_id: "COP",
      },
    ],
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_BASE_URL}?status=success`,
      failure: `${process.env.NEXT_PUBLIC_BASE_URL}?status=failure`,
      pending: `${process.env.NEXT_PUBLIC_BASE_URL}?status=pending`,
    },
    auto_return: "approved",
    external_reference: `devops-${hours}h-${Date.now()}`,
  },
});
