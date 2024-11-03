import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Vineyard } from '@/types/vineyard';
import VineyardActions from './actions';
import VineyardVarietyTooltip from './variety-tooltip';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

type Props = {
    vineyards: Vineyard[];
};

const VineyardsTable = ({ vineyards }: Props) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
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
                    <TableHead className="hidden md:table-cell">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        <span className="sr-only">Open</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vineyards.map((vineyard: Vineyard, index: number) => (
                    <TableRow
                        key={index}
                        onClick={() => {
                            if (!isDesktop) {
                                navigate({
                                    to: `/vineyards/${vineyard.id}`,
                                    search: { bcLast: vineyard.name },
                                });
                            }
                        }}
                    >
                        <TableCell className="hidden sm:table-cell">
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
                        <TableCell className="hidden md:table-cell">
                            <VineyardActions vineyardId={vineyard.id} dropdown />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Link
                                aria-label="Open Vineyard"
                                to={`/vineyards/${vineyard.id}`}
                                search={{ bcLast: vineyard.name }}
                            >
                                <Button variant="ghost">
                                    <Eye />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default VineyardsTable;
