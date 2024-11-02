import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Vineyard } from '@/types/vineyard';
import VineyardActions from './actions';
import VineyardVarietyTooltip from './variety-tooltip';
import { useNavigate } from '@tanstack/react-router';

type Props = {
    vineyards: Vineyard[];
};

const VineyardsTable = ({ vineyards }: Props) => {
    const navigate = useNavigate();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">img</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Soil type</TableHead>
                    <TableHead>Total plants</TableHead>
                    <TableHead className="hidden md:table-cell">Altitude</TableHead>
                    <TableHead className="hidden md:table-cell">Varieties</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vineyards.map((vineyard: Vineyard, index: number) => (
                    <TableRow
                        key={index}
                        onClick={() => {
                            navigate({
                                to: `/vineyards/${vineyard.id}`,
                                search: { bcLast: vineyard.name },
                            });
                        }}
                        className='cursor-pointer'
                    >
                        <TableCell className="hidden sm:table-cell">
                            {
                                //<img
                                //    alt="Product image"
                                //    className="aspect-square rounded-md object-cover"
                                //    height="64"
                                //    src="/placeholder.svg"
                                //    width="64"
                                ///>
                            }
                            <div className="w-16 h-16 rounded-md bg-muted"></div>
                        </TableCell>
                        <TableCell className="font-medium">{vineyard.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{vineyard.soil}</Badge>
                        </TableCell>
                        <TableCell>{vineyard.plants}</TableCell>
                        <TableCell className="hidden md:table-cell">{vineyard.altitude}m</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <VineyardVarietyTooltip varieties={vineyard.varieties} full={false} />
                        </TableCell>
                        <TableCell>
                            <VineyardActions />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default VineyardsTable;
