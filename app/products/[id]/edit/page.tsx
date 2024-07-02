import CreateForm from '@/app/components/CreateForm';
import prisma from '@/libs/prismadb';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        return {
            title: 'Ürün bulunamadı',
        };
    }

    return {
        title: `Ürünü Düzenle - ${product.productName}`,
    };
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        return <div>Ürün bulunamadı.</div>;
    }

    return <CreateForm existingProduct={product} />;
}
