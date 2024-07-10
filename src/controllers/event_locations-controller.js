const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    try {
        const { eventLocations, total } = await getAllEventLocations(userId, limit, offset);
        res.status(200).json({
            collection: eventLocations,
            pagination: {
                limit,
                offset,
                total,
                nextPage: offset + limit < total ? `/api/event-location?limit=${limit}&offset=${offset + limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// por id
router.get('/:id', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const eventLocation = await getEventLocationById(id, userId);
        if (!eventLocation) {
            return res.status(404).json({ message: 'Event location not found or not authorized.' });
        }
        res.status(200).json(eventLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// crea la ubi
router.post('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { name, full_address, id_location, max_capacity } = req.body;

    if (!name || name.length < 3 || !full_address || full_address.length < 3) {
        return res.status(400).json({ message: 'Name or full address is invalid.' });
    }
    if (max_capacity <= 0) {
        return res.status(400).json({ message: 'Max capacity must be greater than zero.' });
    }

    try {
        const newEventLocation = await createEventLocation({ name, full_address, id_location, max_capacity, id_creator_user: userId });
        res.status(201).json(newEventLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/', authenticateToken, async (req, res) => {
    let respuesta;
    const userId = req.user.id;
    const { id, name, full_address, id_location, max_capacity } = req.body;

    if (!name || name.length < 3 || !full_address || full_address.length < 3) {
        return res.status(400).json({ message: 'Name or full address is invalid.' });
    }
    if (max_capacity <= 0) {
        return res.status(400).json({ message: 'Max capacity must be greater than zero.' });
    }

    try {
        const updatedEventLocation = await updateEventLocation({ id, name, full_address, id_location, max_capacity, id_creator_user: userId });
        if (!updatedEventLocation) {
            respuesta = res.status(404).json({ message: 'Event location not found or not authorized.' });
        }else{
            respuesta = res.status(201).json(updatedEventLocation);
        }
    } catch (error) {
        respuesta =res.status(500).json({ message: error.message });
    }

    return respuesta;
});

// creo que elimina una ubicación de evento
router.delete('/:id', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const deletedEventLocation = await deleteEventLocation(id, userId);
        if (!deletedEventLocation) {
            return res.status(404).json({ message: 'Event location not found or not authorized.' });
        }
        res.status(200).json(deletedEventLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
